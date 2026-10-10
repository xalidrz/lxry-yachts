/**
 * SAMPLE LISTINGS — replace with real inventory. Prices are in PKR (full rupees);
 * `marla` is the plot size in Marla (1 Kanal = 20 Marla) and drives the Size filter.
 * `featured` listings appear on the home page. Swap `image` for a real photo path
 * (e.g. "/images/my-listing.jpg"). `id` becomes the URL: /property/<id>.
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
  featured?: boolean;
  description: string;
  features: string[];
}

export const categoryLabel: Record<Category, string> = {
  house: "House",
  apartment: "Apartment",
  plot: "Plot",
  commercial: "Commercial",
};

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
    featured: true,
    description:
      "A contemporary 10 Marla villa with double-height living space, a large glazed frontage and a private lawn. Planned for families who want generous light, privacy and a finish that feels custom-built.",
    features: ["Double-height lounge", "Fitted kitchen with pantry", "Attached bath in every bedroom", "Car porch for two vehicles", "Roof terrace", "Gas, electricity and water connected"],
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
    featured: true,
    description:
      "A bright two-bedroom apartment in a modern tower on Main Boulevard, close to Arcade Mall. Well suited to professionals and small families who want a low-maintenance home in a central location.",
    features: ["Lift access", "Reserved parking", "Backup power", "Open-plan lounge and dining", "Close to shopping and dining", "Security and CCTV"],
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
    featured: true,
    description:
      "A level 1 Kanal corner plot with two open sides, ideal for a large family home or a custom-designed villa. Documents are available for verification and the plot can be built on straight away.",
    features: ["Corner, two open sides", "Level, ready to build", "Possession ready", "Documents available for verification", "Build with CH — design and construction in-house"],
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
    featured: true,
    description:
      "A 10 Marla park-facing plot in a developed block of New City Phase 2, with roads and utilities in place. A strong choice for a first build or for investment.",
    features: ["Park facing", "Developed block", "Verified file", "Utilities nearby", "Map approval and construction support available"],
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
    featured: true,
    description:
      "A full floor in a four-storey commercial plaza on Main Boulevard with strong footfall and visibility. Suited to offices, clinics, showrooms or investors seeking rental income.",
    features: ["Main boulevard frontage", "Basement parking", "Lift", "Glass curtain-wall facade", "Suitable for offices or retail"],
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
    featured: true,
    description:
      "A wide ground-floor showroom with full glass frontage and an office mezzanine, on a busy stretch of Main Boulevard. Ready for fit-out.",
    features: ["Ground floor, glass frontage", "Office mezzanine", "Parking in front", "Signage space", "Ready for fit-out"],
  },
  {
    id: "house-5m",
    title: "Designer 5 Marla House",
    image: "/images/prop-villa.svg",
    listing: "sale",
    category: "house",
    price: 14_500_000,
    area: "Wah Model Town",
    location: "Wah Model Town, Wah Cantt",
    size: "5 Marla",
    marla: 5,
    beds: 3,
    baths: 3,
    description:
      "A smartly planned 5 Marla home that makes the most of its footprint: open living, three bedrooms with attached baths and a finished roof.",
    features: ["Open-plan living", "Three bedrooms with attached baths", "Modular kitchen", "Finished roof", "Tiled floors throughout"],
  },
  {
    id: "house-7m",
    title: "Modern 7 Marla Home",
    image: "/images/prop-villa.svg",
    listing: "sale",
    category: "house",
    price: 21_000_000,
    area: "Officers Colony",
    location: "Officers Colony, Wah Cantt",
    size: "7 Marla",
    marla: 7,
    beds: 4,
    baths: 4,
    description:
      "A four-bedroom home in the quiet, well-kept Officers Colony. Generous bedrooms, a separate drawing room and a landscaped front lawn.",
    features: ["Four bedrooms with attached baths", "Separate drawing room", "Landscaped front lawn", "Quiet, established neighbourhood", "Car porch"],
  },
  {
    id: "house-1k",
    title: "1 Kanal Luxury House",
    image: "/images/prop-villa.svg",
    listing: "sale",
    category: "house",
    price: 68_000_000,
    area: "New City Phase 2",
    location: "New City Phase 2, Wah Cantt",
    size: "1 Kanal",
    marla: 20,
    beds: 6,
    baths: 6,
    description:
      "A statement 1 Kanal residence with six bedrooms, a large lawn and entertaining spaces both indoors and out. Built to a premium specification.",
    features: ["Six bedrooms with attached baths", "Large lawn and outdoor seating", "Home theatre room", "Servant quarter", "Parking for four vehicles"],
  },
  {
    id: "house-rent-5m",
    title: "5 Marla House for Rent",
    image: "/images/prop-villa.svg",
    listing: "rent",
    category: "house",
    price: 55_000,
    area: "Wah Model Town",
    location: "Wah Model Town, Wah Cantt",
    size: "5 Marla",
    marla: 5,
    beds: 3,
    baths: 2,
    description:
      "A clean, well-maintained 5 Marla family home with three bedrooms, available for long-term rent in a convenient location.",
    features: ["Three bedrooms", "Two bathrooms", "Drawing and TV lounge", "Gas and electricity", "Close to schools and markets"],
  },
  {
    id: "studio-rehan",
    title: "Studio Apartment",
    image: "/images/prop-apartment.svg",
    listing: "rent",
    category: "apartment",
    price: 38_000,
    area: "New City Phase 2",
    location: "Rehan Heights, Main Boulevard",
    size: "650 sq ft",
    marla: 2.9,
    beds: 1,
    baths: 1,
    description: "A compact, modern studio apartment — ideal for a single professional or couple who want a central address.",
    features: ["Lift access", "Reserved parking", "Backup power", "Security and CCTV", "Walk to Arcade Mall"],
  },
  {
    id: "plot-3m",
    title: "3 Marla Plot",
    image: "/images/prop-plot-marla.svg",
    listing: "sale",
    category: "plot",
    price: 5_500_000,
    area: "Lalarukh",
    location: "Lalarukh, Wah Cantt",
    size: "3 Marla",
    marla: 3,
    tags: ["Affordable", "Ready to build"],
    description: "A compact, affordable plot suited to a first home or a small rental build, in an established residential area.",
    features: ["Ready to build", "Established area", "Verified documents", "Construction packages available"],
  },
];

export const getProperty = (id: string) => properties.find((p) => p.id === id);

/** 31_500_000 → "3.15 Crore", 1_350_000 → "13.5 Lakh", 65_000 → "65,000" */
export function formatPKR(n: number): string {
  const trim = (v: number) => String(parseFloat(v.toFixed(2)));
  if (n >= 10_000_000) return `${trim(n / 10_000_000)} Crore`;
  if (n >= 100_000) return `${trim(n / 100_000)} Lakh`;
  return n.toLocaleString("en-PK");
}
