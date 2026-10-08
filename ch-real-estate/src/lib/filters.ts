import { type Category, type Property } from "@/data/properties";

export type Chip = "all" | "sale" | "rent" | "plots" | "commercial";
export type Mode = "buy" | "rent" | "build";

export const chipLabels: { id: Chip; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sale", label: "For Sale" },
  { id: "rent", label: "For Rent" },
  { id: "plots", label: "Plots" },
  { id: "commercial", label: "Commercial" },
];

export const chipFilter: Record<Chip, (p: Property) => boolean> = {
  all: () => true,
  sale: (p) => p.listing === "sale",
  rent: (p) => p.listing === "rent",
  plots: (p) => p.category === "plot",
  commercial: (p) => p.category === "commercial",
};

// ----- hero search -----
export const areas = ["New City Phase 2", "Wah Model Town", "Main Boulevard", "Officers Colony", "Lalarukh"];

export const propertyTypes: { value: Category; label: string }[] = [
  { value: "house", label: "House" },
  { value: "plot", label: "Plot" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial" },
];

export const buildTypes = [
  "Grey Structure",
  "Turnkey Construction",
  "Renovation & Remodeling",
  "Design & Map Approval",
];

export interface Range {
  value: string;
  label: string;
  min: number;
  max: number;
}
const INF = Number.POSITIVE_INFINITY;

export const sizeRanges: Range[] = [
  { value: "s1", label: "Up to 5 Marla", min: 0, max: 5 },
  { value: "s2", label: "5 – 10 Marla", min: 5, max: 10 },
  { value: "s3", label: "10 Marla – 1 Kanal", min: 10, max: 20 },
  { value: "s4", label: "1 Kanal & above", min: 20, max: INF },
];

export const budgetBuy: Range[] = [
  { value: "b1", label: "Under PKR 1 Crore", min: 0, max: 10_000_000 },
  { value: "b2", label: "PKR 1 – 2.5 Crore", min: 10_000_000, max: 25_000_000 },
  { value: "b3", label: "PKR 2.5 – 5 Crore", min: 25_000_000, max: 50_000_000 },
  { value: "b4", label: "PKR 5 Crore +", min: 50_000_000, max: INF },
];
export const budgetRent: Range[] = [
  { value: "r1", label: "Under PKR 50,000 / mo", min: 0, max: 50_000 },
  { value: "r2", label: "PKR 50,000 – 1 Lakh / mo", min: 50_000, max: 100_000 },
  { value: "r3", label: "PKR 1 Lakh + / mo", min: 100_000, max: INF },
];
export const budgetBuild: Range[] = [
  { value: "c1", label: "Under PKR 50 Lakh", min: 0, max: 5_000_000 },
  { value: "c2", label: "PKR 50 Lakh – 1 Crore", min: 5_000_000, max: 10_000_000 },
  { value: "c3", label: "PKR 1 – 3 Crore", min: 10_000_000, max: 30_000_000 },
  { value: "c4", label: "PKR 3 Crore +", min: 30_000_000, max: INF },
];

export interface Criteria {
  mode: "buy" | "rent";
  area?: string;
  type?: Category;
  size?: string;
  budget?: string;
}

export function matches(p: Property, c: Criteria): boolean {
  if (p.listing !== (c.mode === "buy" ? "sale" : "rent")) return false;
  if (c.area && p.area !== c.area) return false;
  if (c.type && p.category !== c.type) return false;
  if (c.size) {
    const r = sizeRanges.find((s) => s.value === c.size);
    if (r && (p.marla < r.min || p.marla > r.max)) return false;
  }
  if (c.budget) {
    const r = [...budgetBuy, ...budgetRent].find((b) => b.value === c.budget);
    if (r && (p.price < r.min || p.price > r.max)) return false;
  }
  return true;
}

/** Home-page featured chips. */
export const filterByChip = (list: Property[], chip: Chip) => list.filter(chipFilter[chip]);

// ----- URL <-> criteria (so /buy?type=plot&budget=b2 is shareable) -----
export type Sort = "newest" | "price-asc" | "price-desc";
export const sortOptions: { value: Sort; label: string }[] = [
  { value: "newest", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export const criteriaToParams = (c: Omit<Criteria, "mode">, sort?: Sort) => {
  const q = new URLSearchParams();
  if (c.area) q.set("area", c.area);
  if (c.type) q.set("type", c.type);
  if (c.size) q.set("size", c.size);
  if (c.budget) q.set("budget", c.budget);
  if (sort && sort !== "newest") q.set("sort", sort);
  return q;
};

export const paramsToCriteria = (mode: "buy" | "rent", q: URLSearchParams): Criteria => {
  const type = q.get("type");
  return {
    mode,
    area: areas.includes(q.get("area") ?? "") ? q.get("area")! : undefined,
    type: propertyTypes.some((t) => t.value === type) ? (type as Category) : undefined,
    size: sizeRanges.some((r) => r.value === q.get("size")) ? q.get("size")! : undefined,
    budget: [...budgetBuy, ...budgetRent].some((r) => r.value === q.get("budget")) ? q.get("budget")! : undefined,
  };
};

export const paramsToSort = (q: URLSearchParams): Sort => {
  const v = q.get("sort");
  return sortOptions.some((o) => o.value === v) ? (v as Sort) : "newest";
};

export const sortProperties = (list: Property[], sort: Sort) =>
  sort === "newest"
    ? [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    : [...list].sort((a, b) => (sort === "price-asc" ? a.price - b.price : b.price - a.price));
