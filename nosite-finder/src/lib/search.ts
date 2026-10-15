import { firstPhone } from "./phone";
import { haversineKm } from "./geo";
import { labelFromTags } from "./categories";
import type { Business, GeocodeResult } from "./types";

export type SearchErrorKind = "not-found" | "timeout" | "busy" | "network" | "cancelled" | "unknown";

export class SearchError extends Error {
  constructor(public kind: SearchErrorKind, message: string) {
    super(message);
  }
}

/* ------------------------------ rate limit ------------------------------ */

/** Minimum gap between searches that actually hit the network. Keeps us polite to the free servers. */
export const MIN_SEARCH_GAP_MS = 10_000;
const LAST_KEY = "nosite-finder:last-search";
let lastSearchAt = 0;

export function msUntilNextSearch(now = Date.now()): number {
  let last = lastSearchAt;
  try {
    last = Math.max(last, Number(sessionStorage.getItem(LAST_KEY)) || 0);
  } catch {
    /* storage unavailable */
  }
  return Math.max(0, last + MIN_SEARCH_GAP_MS - now);
}

export function markSearchStarted(now = Date.now()): void {
  lastSearchAt = now;
  try {
    sessionStorage.setItem(LAST_KEY, String(now));
  } catch {
    /* ignore */
  }
}

/* -------------------------------- caches -------------------------------- */

const GEO_KEY = "nosite-finder:geocode:v1";
const RESULT_TTL_MS = 15 * 60 * 1000;
const resultCache = new Map<string, { at: number; value: SearchOutcome }>();

function readGeoCache(): Record<string, GeocodeResult> {
  try {
    return JSON.parse(localStorage.getItem(GEO_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/* ------------------------------- geocoding ------------------------------ */

const NOMINATIM = "https://nominatim.openstreetmap.org/search";

export async function geocode(city: string, signal: AbortSignal): Promise<GeocodeResult & { cached: boolean }> {
  const key = city.trim().toLowerCase();
  const cache = readGeoCache();
  if (cache[key]) return { ...cache[key], cached: true };

  const url = `${NOMINATIM}?${new URLSearchParams({
    q: city.trim(),
    format: "jsonv2",
    limit: "1",
    addressdetails: "1",
    "accept-language": "en",
  })}`;

  let res: Response;
  try {
    res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  } catch (e) {
    throw wrapFetchError(e);
  }
  if (res.status === 429) throw new SearchError("busy", "The place lookup service is busy. Wait a few seconds and try again.");
  if (!res.ok) throw new SearchError("network", `The place lookup service answered with an error (${res.status}).`);

  const json = (await res.json()) as Array<{ lat: string; lon: string; display_name: string; address?: { country_code?: string } }>;
  if (!json.length) throw new SearchError("not-found", `We couldn't find "${city.trim()}". Check the spelling or add the country, e.g. "Lahore, Pakistan".`);

  const hit: GeocodeResult = {
    lat: Number(json[0].lat),
    lon: Number(json[0].lon),
    displayName: json[0].display_name,
    countryCode: json[0].address?.country_code,
  };
  try {
    const next = { ...cache, [key]: hit };
    const keys = Object.keys(next);
    if (keys.length > 40) delete next[keys[0]];
    localStorage.setItem(GEO_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return { ...hit, cached: false };
}

/* -------------------------------- overpass ------------------------------ */

const OVERPASS_MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];
const ATTEMPT_TIMEOUT_MS = 30_000;
const TOTAL_BUDGET_MS = 70_000;
const MAX_ELEMENTS = 600;

export function buildQuery(lat: number, lon: number, radiusKm: number, filters: string[]): string {
  const around = `(around:${Math.round(radiusKm * 1000)},${lat.toFixed(5)},${lon.toFixed(5)})`;
  // Must have a name and must NOT have any website-like tag.
  const lines = filters.map((flt) => `  nwr${around}${flt}["name"][!"website"][!"contact:website"][!"url"];`);
  return `[out:json][timeout:25];\n(\n${lines.join("\n")}\n);\nout center tags ${MAX_ELEMENTS};`;
}

interface OsmElement {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

function wrapFetchError(e: unknown): SearchError {
  if (e instanceof SearchError) return e;
  if (e instanceof DOMException && e.name === "AbortError") return new SearchError("cancelled", "Search cancelled.");
  return new SearchError("network", "Couldn't reach the server. Check your internet connection and try again.");
}

async function overpassRequest(query: string, signal: AbortSignal): Promise<OsmElement[]> {
  const started = Date.now();
  let lastKind: SearchErrorKind = "timeout";

  for (const endpoint of OVERPASS_MIRRORS) {
    if (Date.now() - started > TOTAL_BUDGET_MS) break;
    const ctrl = new AbortController();
    const onAbort = () => ctrl.abort();
    signal.addEventListener("abort", onAbort);
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      ctrl.abort();
    }, ATTEMPT_TIMEOUT_MS);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: new URLSearchParams({ data: query }),
        signal: ctrl.signal,
      });
      if (res.status === 429) {
        lastKind = "busy";
        continue;
      }
      if (res.status >= 500) {
        lastKind = "timeout";
        continue;
      }
      if (!res.ok) {
        lastKind = "unknown";
        continue;
      }
      const json = (await res.json()) as { elements?: OsmElement[]; remark?: string };
      // Overpass reports a server-side timeout / out-of-memory as a 200 with a "remark".
      if (json.remark && /timed out|out of memory|runtime error/i.test(json.remark)) {
        lastKind = "timeout";
        continue;
      }
      return json.elements ?? [];
    } catch (e) {
      if (signal.aborted) throw new SearchError("cancelled", "Search cancelled.");
      lastKind = timedOut ? "timeout" : "network";
    } finally {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
    }
  }

  if (lastKind === "network") throw new SearchError("network", "Couldn't reach the map data servers. Check your internet connection and retry.");
  if (lastKind === "busy") throw new SearchError("busy", "The free map data servers are busy right now (too many requests). Wait a minute and retry.");
  throw new SearchError("timeout", "The map data server timed out. Big radius + broad category is slow on the free servers - retry, or shrink the radius.");
}

function formatAddress(t: Record<string, string>): string | undefined {
  if (t["addr:full"]) return t["addr:full"];
  const street = [t["addr:housenumber"], t["addr:street"]].filter(Boolean).join(" ");
  const parts = [t["addr:housename"], street, t["addr:suburb"] ?? t["addr:neighbourhood"], t["addr:city"] ?? t["addr:town"] ?? t["addr:village"], t["addr:postcode"]];
  const out = parts.filter(Boolean).join(", ");
  return out || undefined;
}

export function toBusinesses(elements: OsmElement[], origin: { lat: number; lon: number }, city: string, countryCode?: string): Business[] {
  const seen = new Set<string>();
  const out: Business[] = [];
  for (const el of elements) {
    const t = el.tags;
    if (!t?.name) continue;
    // Belt and braces: Overpass already excluded these, but keep the rule in one obvious place.
    if (t.website || t["contact:website"] || t.url) continue;
    const phone = firstPhone(t.phone ?? t["contact:phone"] ?? t.mobile ?? t["contact:mobile"]);
    const address = formatAddress(t);
    if (!phone && !address) continue;

    const lat = el.lat ?? el.center?.lat;
    const lon = el.lon ?? el.center?.lon;
    if (lat === undefined || lon === undefined) continue;

    const id = `${el.type}/${el.id}`;
    if (seen.has(id)) continue;
    seen.add(id);

    out.push({
      id,
      name: t.name.trim(),
      category: labelFromTags(t),
      address,
      phone,
      lat,
      lon,
      city,
      countryCode,
      distanceKm: haversineKm(origin.lat, origin.lon, lat, lon),
    });
  }
  // Reachable-by-phone first, then nearest.
  return out.sort((a, b) => Number(!!b.phone) - Number(!!a.phone) || (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
}

/* --------------------------------- driver ------------------------------- */

export interface SearchParams {
  city: string;
  radiusKm: number;
  categoryLabel: string;
  filters: string[];
}

export interface SearchOutcome {
  businesses: Business[];
  center: { lat: number; lon: number };
  placeName: string;
  truncated: boolean;
}

export type Stage = "locating" | "searching";

/** True when running this search would be answered from cache (so it needs no cooldown). */
export function isCached(p: SearchParams): boolean {
  const geo = readGeoCache()[p.city.trim().toLowerCase()];
  if (!geo) return false;
  const hit = resultCache.get(cacheKey(geo, p));
  return !!hit && Date.now() - hit.at < RESULT_TTL_MS;
}

function cacheKey(geo: { lat: number; lon: number }, p: SearchParams): string {
  return [geo.lat.toFixed(3), geo.lon.toFixed(3), p.radiusKm, p.filters.join("")].join("|");
}

export async function runSearch(p: SearchParams, signal: AbortSignal, onStage: (s: Stage) => void): Promise<SearchOutcome> {
  onStage("locating");
  const geo = await geocode(p.city, signal);

  const key = cacheKey(geo, p);
  const cached = resultCache.get(key);
  if (cached && Date.now() - cached.at < RESULT_TTL_MS) return cached.value;

  onStage("searching");
  const elements = await overpassRequest(buildQuery(geo.lat, geo.lon, p.radiusKm, p.filters), signal);
  const value: SearchOutcome = {
    businesses: toBusinesses(elements, geo, p.city.trim(), geo.countryCode),
    center: { lat: geo.lat, lon: geo.lon },
    placeName: geo.displayName,
    truncated: elements.length >= MAX_ELEMENTS,
  };
  resultCache.set(key, { at: Date.now(), value });
  return value;
}
