import { FEATURED_IDS, vehicles, type Vehicle } from "@/data/vehicles";

export const ALL = vehicles;

export const bounds = {
  price: [0, Math.ceil(Math.max(...ALL.map((v) => v.price)) / 5000) * 5000] as [number, number],
  km: [0, Math.ceil(Math.max(...ALL.map((v) => v.km)) / 10000) * 10000] as [number, number],
  year: [Math.min(...ALL.map((v) => v.ez?.year ?? 9999)), new Date().getFullYear()] as [number, number],
  ps: [0, Math.ceil(Math.max(...ALL.map((v) => v.ps)) / 50) * 50] as [number, number],
};

export interface Filters {
  price: [number, number];
  makes: string[];
  models: string[];
  fuels: string[];
  gearboxes: string[];
  year: [number, number];
  kmMax: number;
  psMin: number;
  features: string[];
  colors: string[];
}

export const defaultFilters = (): Filters => ({
  price: [...bounds.price],
  makes: [],
  models: [],
  fuels: [],
  gearboxes: [],
  year: [...bounds.year],
  kmMax: bounds.km[1],
  psMin: bounds.ps[0],
  features: [],
  colors: [],
});

export type SortKey = "price-asc" | "price-desc" | "km-asc" | "year-desc" | "ps-desc";
export const sortKeys: SortKey[] = ["price-asc", "price-desc", "year-desc", "km-asc", "ps-desc"];

/** Vehicles without Erstzulassung are new cars: they count as the current year. */
const yearOf = (v: Vehicle) => v.ez?.year ?? bounds.year[1];
const ezValue = (v: Vehicle) => (v.ez ? v.ez.year * 12 + v.ez.month : 9999 * 12);

export const matches = (v: Vehicle, f: Filters, skip?: keyof Filters) =>
  (skip === "price" || (v.price >= f.price[0] && v.price <= f.price[1])) &&
  (skip === "makes" || !f.makes.length || f.makes.includes(v.make)) &&
  (skip === "models" || !f.models.length || f.models.includes(v.model)) &&
  (skip === "fuels" || !f.fuels.length || f.fuels.includes(v.fuel)) &&
  (skip === "gearboxes" || !f.gearboxes.length || f.gearboxes.includes(v.gearbox)) &&
  (skip === "year" || (yearOf(v) >= f.year[0] && yearOf(v) <= f.year[1])) &&
  (skip === "kmMax" || v.km <= f.kmMax) &&
  (skip === "psMin" || v.ps >= f.psMin) &&
  (skip === "features" || f.features.every((x) => v.features.includes(x))) &&
  (skip === "colors" || !f.colors.length || (v.color != null && f.colors.includes(v.color)));

export const sortVehicles = (list: Vehicle[], key: SortKey) => {
  const out = [...list];
  const by: Record<SortKey, (a: Vehicle, b: Vehicle) => number> = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "km-asc": (a, b) => a.km - b.km,
    "year-desc": (a, b) => ezValue(b) - ezValue(a),
    "ps-desc": (a, b) => b.ps - a.ps,
  };
  return out.sort(by[key]);
};

/** Distinct values for a facet with counts, computed against every *other* active filter. */
export const facet = (get: (v: Vehicle) => string | null, f: Filters, skip: keyof Filters) => {
  const counts = new Map<string, number>();
  for (const v of ALL) {
    const k = get(v);
    if (k == null) continue;
    counts.set(k, (counts.get(k) ?? 0) + (matches(v, f, skip) ? 1 : 0));
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "de"));
};

/** Ausstattung is an AND-filter: counts are the vehicles that match everything selected *and* have the feature. */
export const featureCounts = (f: Filters) =>
  allFeatures().map((name): [string, number] => [name, ALL.filter((v) => matches(v, f) && v.features.includes(name)).length]);

export const modelsFor = (makes: string[]) => [...new Set(ALL.filter((v) => !makes.length || makes.includes(v.make)).map((v) => v.model))].sort((a, b) => a.localeCompare(b, "de"));

export const allMakes = () => [...new Set(ALL.map((v) => v.make))].sort((a, b) => a.localeCompare(b, "de"));
export const allFeatures = () => [...new Set(ALL.flatMap((v) => v.features))].sort((a, b) => a.localeCompare(b, "de"));
export const allFuels = () => [...new Set(ALL.map((v) => v.fuel))];

/** Number of non-default filters (for the mobile "Filter (n)" badge). */
export const activeCount = (f: Filters) => {
  const d = defaultFilters();
  return (
    Number(f.price[0] !== d.price[0] || f.price[1] !== d.price[1]) +
    Number(f.year[0] !== d.year[0] || f.year[1] !== d.year[1]) +
    Number(f.kmMax !== d.kmMax) +
    Number(f.psMin !== d.psMin) +
    f.makes.length + f.models.length + f.fuels.length + f.gearboxes.length + f.features.length + f.colors.length
  );
};

/** URL <-> filters, so the hero search and shared links land on a pre-filtered inventory. */
export const filtersFromParams = (p: URLSearchParams, preset?: Partial<Filters>): { filters: Filters; sort: SortKey } => {
  const f = { ...defaultFilters(), ...preset };
  const list = (k: string) => p.get(k)?.split(",").filter(Boolean) ?? [];
  if (p.has("marke")) f.makes = list("marke");
  if (p.has("modell")) f.models = list("modell");
  if (p.has("kraftstoff")) f.fuels = list("kraftstoff");
  if (p.has("getriebe")) f.gearboxes = list("getriebe");
  if (p.has("ausstattung")) f.features = list("ausstattung");
  if (p.has("farbe")) f.colors = list("farbe");
  const num = (k: string) => (p.has(k) && Number.isFinite(Number(p.get(k))) ? Number(p.get(k)) : null);
  const clamp = (n: number, [lo, hi]: [number, number]) => Math.min(hi, Math.max(lo, n));
  const pv = num("preisBis"); if (pv != null) f.price = [f.price[0], clamp(pv, bounds.price)];
  const pm = num("preisAb"); if (pm != null) f.price = [clamp(pm, bounds.price), f.price[1]];
  const km = num("kmBis"); if (km != null) f.kmMax = clamp(km, bounds.km);
  const ps = num("psAb"); if (ps != null) f.psMin = clamp(ps, bounds.ps);
  const ya = num("ezAb"); if (ya != null) f.year = [clamp(ya, bounds.year), f.year[1]];
  const sort = (p.get("sort") as SortKey) ?? "price-asc";
  return { filters: f, sort: sortKeys.includes(sort) ? sort : "price-asc" };
};

export const paramsFromFilters = (f: Filters, sort: SortKey, preset?: Partial<Filters>) => {
  const p = new URLSearchParams();
  const d = { ...defaultFilters(), ...preset };
  const set = (k: string, a: string[], base: string[] = []) => {
    if (a.length && a.join() !== base.join()) p.set(k, a.join(","));
  };
  set("marke", f.makes, d.makes);
  set("modell", f.models);
  set("kraftstoff", f.fuels);
  set("getriebe", f.gearboxes);
  set("ausstattung", f.features);
  set("farbe", f.colors);
  if (f.price[0] !== d.price[0]) p.set("preisAb", String(f.price[0]));
  if (f.price[1] !== d.price[1]) p.set("preisBis", String(f.price[1]));
  if (f.kmMax !== d.kmMax) p.set("kmBis", String(f.kmMax));
  if (f.psMin !== d.psMin) p.set("psAb", String(f.psMin));
  if (f.year[0] !== d.year[0]) p.set("ezAb", String(f.year[0]));
  if (sort !== "price-asc") p.set("sort", sort);
  return p;
};

/**
 * "Angebote der Woche" — never empty. Curated ids first; if some are no longer in stock the list is
 * back-filled with the best-value vehicles we do have (lowest price per PS, newest first as tie-break).
 */
export const pickFeatured = (count = 4, pool: Vehicle[] = ALL): Vehicle[] => {
  const picked = FEATURED_IDS.map((id) => pool.find((v) => v.id === id)).filter((v): v is Vehicle => Boolean(v));
  if (picked.length >= count) return picked.slice(0, count);
  const rest = pool
    .filter((v) => !picked.includes(v))
    .sort((a, b) => a.price / a.ps - b.price / b.ps || ezValue(b) - ezValue(a));
  return [...picked, ...rest].slice(0, count);
};
