import { phoneInfoFromTags } from "./phone";
import { STATIC_BOXES, inBox, type Box } from "./countries";
import { haversineKm } from "./geo";
import { labelFromTags } from "./categories";
import type { Business, GeocodeResult } from "./types";

export type SearchErrorKind = "not-found" | "too-broad" | "offline" | "timeout" | "busy" | "network" | "cancelled" | "unknown";

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

const GEO_KEY = "nosite-finder:geocode:v3";
const BOX_KEY = "nosite-finder:countrybox:v1";
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
const MAX_AREA_KM = 50;
/** Nominatim place types that are a whole country or state, however the box looks. */
const HUGE_TYPES = new Set(["country", "state"]);
/** Place types that are a single settlement: a large city box (e.g. Karachi) is fine. */
const SETTLEMENT_TYPES = new Set(["city", "town", "village", "hamlet", "suburb", "neighbourhood", "quarter", "city_district", "borough", "municipality"]);

const TOO_BROAD = "That area is too big. Enter a city or town, like Wah Cantt or Lahore.";
const notFound = (country: string) => `We couldn't find that place in ${country}. Check the spelling or pick another city.`;

function isOffline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}

function offlineError(): SearchError {
  return new SearchError("offline", "You seem to be offline. Check your connection and retry.");
}

function bboxSizeKm(bb: number[]): number {
  const [south, north, west, east] = bb;
  const midLat = (south + north) / 2;
  return Math.max(haversineKm(south, west, north, west), haversineKm(midLat, west, midLat, east));
}

/** Throws when the geocoded place is a country/state or too wide to search sensibly. */
function assertSearchable(geo: GeocodeResult): void {
  const kinds = [geo.placeType, geo.addressType].filter(Boolean) as string[];
  if (kinds.some((k) => HUGE_TYPES.has(k))) throw new SearchError("too-broad", TOO_BROAD);
  if (kinds.some((k) => SETTLEMENT_TYPES.has(k))) return;
  if (geo.bboxKm !== undefined && geo.bboxKm > MAX_AREA_KM) throw new SearchError("too-broad", TOO_BROAD);
}

export async function geocode(city: string, countryCode: string, countryName: string, signal: AbortSignal): Promise<GeocodeResult & { cached: boolean }> {
  const key = `${countryCode.toLowerCase()}|${city.trim().toLowerCase()}`;
  const cache = readGeoCache();
  if (cache[key]) {
    assertSearchable(cache[key]);
    return { ...cache[key], cached: true };
  }
  if (isOffline()) throw offlineError();

  const url = `${NOMINATIM}?${new URLSearchParams({
    q: city.trim(),
    countrycodes: countryCode.toLowerCase(),
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
  if (res.status === 429) throw new SearchError("busy", BUSY);
  if (!res.ok) throw new SearchError("network", "The place lookup service had a problem. Please retry.");

  const json = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
    type?: string;
    addresstype?: string;
    boundingbox?: string[];
    address?: { country_code?: string };
  }>;
  // countrycodes already limits Nominatim to the country; double-check the hit says the same.
  const r = json.find((x) => !x.address?.country_code || x.address.country_code.toLowerCase() === countryCode.toLowerCase());
  if (!r) throw new SearchError("not-found", notFound(countryName));
  const bb = r.boundingbox?.map(Number);
  const hit: GeocodeResult = {
    lat: Number(r.lat),
    lon: Number(r.lon),
    displayName: r.display_name,
    countryCode: r.address?.country_code,
    placeType: r.type,
    addressType: r.addresstype,
    bboxKm: bb && bb.length === 4 && bb.every(Number.isFinite) ? bboxSizeKm(bb) : undefined,
  };
  // Cache before the size check so a repeat of the same text is rejected without another request.
  try {
    const next = { ...cache, [key]: hit };
    const keys = Object.keys(next);
    if (keys.length > 40) delete next[keys[0]];
    localStorage.setItem(GEO_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  assertSearchable(hit);
  return { ...hit, cached: false };
}

/* -------------------------------- overpass ------------------------------ */

const BUSY = "The map server is busy. Wait 30 seconds and retry.";
const TIMEOUT = "This search took too long. Try a smaller radius or a more specific area.";

/** Tried in order. Each gets 25 s, then we silently move on to the next. */
const OVERPASS_SERVERS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
];
const ATTEMPT_TIMEOUT_MS = 25_000;
const MAX_ELEMENTS = 800;

/** Where the next search starts. Advances after a total failure so "Retry" begins on a different server. */
let startIndex = 0;

export function buildQuery(lat: number, lon: number, radiusKm: number, filters: string[], countryCode: string): string {
  const around = `(around:${Math.round(radiusKm * 1000)},${lat.toFixed(5)},${lon.toFixed(5)})`;
  // Only inside the chosen country's area, and only within the radius around the city.
  // Must have a name and must NOT have any website-like tag. Phones are checked after fetching so we can count the ones hidden.
  const lines = filters.map((flt) => `  nwr(area.c)${around}${flt}["name"][!"website"][!"contact:website"][!"url"];`);
  return `[out:json][timeout:25];\narea["ISO3166-1"="${countryCode.toUpperCase()}"][admin_level=2]->.c;\n(\n${lines.join("\n")}\n);\nout center tags ${MAX_ELEMENTS};`;
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
  if (isOffline()) return offlineError();
  return new SearchError("network", "Couldn't reach the map servers. Please try again.");
}

type Failure = "timeout" | "busy" | "network";

async function overpassRequest(query: string, signal: AbortSignal): Promise<OsmElement[]> {
  if (isOffline()) throw offlineError();
  const failures: Failure[] = [];

  for (let n = 0; n < OVERPASS_SERVERS.length; n++) {
    const index = (startIndex + n) % OVERPASS_SERVERS.length;
    const ctrl = new AbortController();
    const onAbort = () => ctrl.abort();
    signal.addEventListener("abort", onAbort);
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      ctrl.abort();
    }, ATTEMPT_TIMEOUT_MS);

    try {
      const res = await fetch(OVERPASS_SERVERS[index], { method: "POST", body: new URLSearchParams({ data: query }), signal: ctrl.signal });
      if (res.status === 429) {
        failures.push("busy");
        continue;
      }
      if (!res.ok) {
        failures.push("timeout"); // 5xx from Overpass is almost always an overloaded/timed-out query
        continue;
      }
      const json = (await res.json()) as { elements?: OsmElement[]; remark?: string };
      // Overpass reports a server-side timeout / out-of-memory as a 200 with a "remark".
      if (json.remark && /timed out|out of memory|runtime error/i.test(json.remark)) {
        failures.push("timeout");
        continue;
      }
      startIndex = index; // stick with the server that worked
      return json.elements ?? [];
    } catch {
      if (signal.aborted) throw new SearchError("cancelled", "Search cancelled.");
      failures.push(timedOut ? "timeout" : "network");
    } finally {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
    }
  }

  // Every server failed: the next attempt (Retry) starts on the following one.
  startIndex = (startIndex + 1) % OVERPASS_SERVERS.length;

  if (isOffline()) throw offlineError();
  if (failures.includes("timeout")) throw new SearchError("timeout", TIMEOUT);
  if (failures.includes("busy")) throw new SearchError("busy", BUSY);
  throw new SearchError("network", "Couldn't reach the map servers. Please try again.");
}

function formatAddress(t: Record<string, string>): string | undefined {
  if (t["addr:full"]) return t["addr:full"];
  const street = [t["addr:housenumber"], t["addr:street"]].filter(Boolean).join(" ");
  const parts = [t["addr:housename"], street, t["addr:suburb"] ?? t["addr:neighbourhood"], t["addr:city"] ?? t["addr:town"] ?? t["addr:village"], t["addr:postcode"]];
  const out = parts.filter(Boolean).join(", ");
  return out || undefined;
}

export interface Region {
  code: string;
  name: string;
}

export function toBusinesses(
  elements: OsmElement[],
  origin: { lat: number; lon: number },
  city: string,
  country: Region,
  box: Box | null,
): { businesses: Business[]; hiddenNoPhone: number } {
  const seenIds = new Set<string>();
  const seenNamePhone = new Set<string>();
  const out: Business[] = [];
  let hiddenNoPhone = 0;

  for (const el of elements) {
    const t = el.tags;
    if (!t?.name) continue;
    // Belt and braces: Overpass already excluded these, but keep the rule in one obvious place.
    if (t.website || t["contact:website"] || t.url) continue;

    const lat = el.lat ?? el.center?.lat;
    const lon = el.lon ?? el.center?.lon;
    if (lat === undefined || lon === undefined) continue;
    // Must really be inside the country
    if (box && !inBox(lat, lon, box)) continue;

    const id = `${el.type}/${el.id}`;
    if (seenIds.has(id)) continue;
    seenIds.add(id);

    const phones = phoneInfoFromTags(t, country.code);
    if (!phones) {
      hiddenNoPhone++;
      continue;
    }
    const name = t.name.trim();
    const dupKey = `${name.toLowerCase()}|${phones.primary}`;
    if (seenNamePhone.has(dupKey)) continue;
    seenNamePhone.add(dupKey);

    out.push({
      id,
      name,
      category: labelFromTags(t),
      address: formatAddress(t),
      phone: phones.primary,
      phones: phones.all,
      isMobile: phones.mobile,
      lat,
      lon,
      city,
      country: country.name,
      countryCode: country.code.toLowerCase(),
      distanceKm: haversineKm(origin.lat, origin.lon, lat, lon),
    });
  }
  // Mobile numbers first, then landlines; nearest first within each group.
  out.sort((a, b) => Number(!!b.isMobile) - Number(!!a.isMobile) || (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  return { businesses: out, hiddenNoPhone };
}

/** Country bounding box: built in for the common countries, otherwise fetched once from Nominatim and cached. */
export async function countryBox(code: string, name: string, signal: AbortSignal): Promise<Box | null> {
  const upper = code.toUpperCase();
  if (STATIC_BOXES[upper]) return STATIC_BOXES[upper];
  let cache: Record<string, Box> = {};
  try {
    cache = JSON.parse(localStorage.getItem(BOX_KEY) ?? "{}");
  } catch {
    /* ignore */
  }
  if (cache[upper]) return cache[upper];
  try {
    const url = `${NOMINATIM}?${new URLSearchParams({ q: name, countrycodes: code.toLowerCase(), featuretype: "country", format: "jsonv2", limit: "1", "accept-language": "en" })}`;
    const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const bb = ((await res.json()) as Array<{ boundingbox?: string[] }>)[0]?.boundingbox?.map(Number);
    if (!bb || bb.length !== 4 || !bb.every(Number.isFinite)) return null;
    const [south, north, west, east] = bb;
    if (west > east) return null; // crosses the antimeridian: skip rather than reject good results
    const box: Box = [south, west, north, east];
    try {
      localStorage.setItem(BOX_KEY, JSON.stringify({ ...cache, [upper]: box }));
    } catch {
      /* ignore */
    }
    return box;
  } catch {
    if (signal.aborted) throw new SearchError("cancelled", "Search cancelled.");
    return null; // the Overpass country-area filter still applies
  }
}

/* --------------------------------- driver ------------------------------- */

export interface SearchParams {
  countryCode: string;
  countryName: string;
  city: string;
  radiusKm: number;
  categoryLabel: string;
  filters: string[];
}

export interface SearchOutcome {
  businesses: Business[];
  /** No-website businesses dropped because they list no phone number. */
  hiddenNoPhone: number;
  center: { lat: number; lon: number };
  placeName: string;
  truncated: boolean;
}

export type Stage = "locating" | "searching";

const geoKey = (p: SearchParams) => `${p.countryCode.toLowerCase()}|${p.city.trim().toLowerCase()}`;

/** True when running this search would be answered from cache (so it needs no cooldown). */
export function isCached(p: SearchParams): boolean {
  const geo = readGeoCache()[geoKey(p)];
  if (!geo) return false;
  const hit = resultCache.get(cacheKey(geo, p));
  return !!hit && Date.now() - hit.at < RESULT_TTL_MS;
}

function cacheKey(geo: { lat: number; lon: number }, p: SearchParams): string {
  return [p.countryCode, geo.lat.toFixed(3), geo.lon.toFixed(3), p.radiusKm, p.filters.join("")].join("|");
}

export async function runSearch(p: SearchParams, signal: AbortSignal, onStage: (s: Stage) => void): Promise<SearchOutcome> {
  onStage("locating");
  const geo = await geocode(p.city, p.countryCode, p.countryName, signal);

  const key = cacheKey(geo, p);
  const cached = resultCache.get(key);
  if (cached && Date.now() - cached.at < RESULT_TTL_MS) return cached.value;

  const box = await countryBox(p.countryCode, p.countryName, signal);

  onStage("searching");
  const elements = await overpassRequest(buildQuery(geo.lat, geo.lon, p.radiusKm, p.filters, p.countryCode), signal);
  const { businesses, hiddenNoPhone } = toBusinesses(elements, geo, p.city.trim(), { code: p.countryCode, name: p.countryName }, box);
  const value: SearchOutcome = {
    businesses,
    hiddenNoPhone,
    center: { lat: geo.lat, lon: geo.lon },
    placeName: geo.displayName,
    truncated: elements.length >= MAX_ELEMENTS,
  };
  resultCache.set(key, { at: Date.now(), value });
  return value;
}
