/**
 * SAMPLE LISTINGS — replace with real inventory. Prices are in PKR (full rupees);
 * `marla` is the plot size in Marla (1 Kanal = 20 Marla) and drives the Size filter.
 * Swap `image` for a real photo path (e.g. "/images/my-listing.jpg").
 */
export type Category = "house" | "apartment" | "plot" | "commercial";
export type Listing = "sale" | "rent";

export interface Property {
  id: string;
  title: string;
  image: string;
  listing: Listing;
  category: Category;
  price: number;
  area: string;
  location: string;
  /** Display size, e.g. "10 Marla" */
  size: string;
  marla: number;
  beds?: number;
  baths?: number;
  tags?: string[];
}

export const properties: Property[] = [
  {
    id: "villa-10m",
    title: "Modern Luxury Villa",
    image: "/images/prop-villa.svg",
    listing: "sale",
    category: "house",
    price: 31_500_000,
    area: "New City Phase 2",
    location: "New City Phase 2, Wah Cantt",
    size: "10 Marla",
    marla: 10,
    beds: 5,
    baths: 5,
  },
  {
    id: "apt-rehan",
    title: "2-Bed Executive Apartment",
    image: "/images/prop-apartment.svg",
    listing: "rent",
    category: "apartment",
    price: 65_000,
    area: "New City Phase 2",
    location: "Rehan Heights, Main Boulevard",
    size: "1,150 sq ft",
    marla: 5.1,
    beds: 2,
    baths: 2,
  },
  {
    id: "plot-1k",
    title: "Corner Residential Plot",
    image: "/images/prop-plot-kanal.svg",
    listing: "sale",
    category: "plot",
    price: 24_000_000,
    area: "Wah Model Town",
    location: "Wah Model Town, Wah Cantt",
    size: "1 Kanal",
    marla: 20,
    tags: ["Corner plot", "Possession ready"],
  },
  {
    id: "plot-10m",
    title: "Prime Residential Plot",
    image: "/images/prop-plot-marla.svg",
    listing: "sale",
    category: "plot",
    price: 12_000_000,
    area: "New City Phase 2",
    location: "New City Phase 2, Wah Cantt",
    size: "10 Marla",
    marla: 10,
    tags: ["Park facing", "Verified file"],
  },
  {
    id: "plaza-4m",
    title: "Commercial Plaza Floor",
    image: "/images/prop-plaza.svg",
    listing: "sale",
    category: "commercial",
    price: 52_500_000,
    area: "Main Boulevard",
    location: "Main Boulevard, Wah Cantt",
    size: "4 Marla",
    marla: 4,
    tags: ["Main road", "Basement parking"],
  },
  {
    id: "showroom-rent",
    title: "Showroom & Office Space",
    image: "/images/prop-showroom.svg",
    listing: "rent",
    category: "commercial",
    price: 180_000,
    area: "Main Boulevard",
    location: "Main Boulevard, Wah Cantt",
    size: "8 Marla",
    marla: 8,
    tags: ["Ground floor", "Glass frontage"],
  },
];

/** 31_500_000 → "3.15 Crore", 1_350_000 → "13.5 Lakh", 65_000 → "65,000" */
export function formatPKR(n: number): string {
  const trim = (v: number) => String(parseFloat(v.toFixed(2)));
  if (n >= 10_000_000) return `${trim(n / 10_000_000)} Crore`;
  if (n >= 100_000) return `${trim(n / 100_000)} Lakh`;
  return n.toLocaleString("en-PK");
}
