export interface Category {
  id: string;
  label: string;
  /** Overpass tag filters; a business matching ANY of them is included. */
  filters: string[];
}

const f = (key: string, values: string) => `["${key}"~"^(${values})$"]`;

export const CATEGORIES: Category[] = [
  { id: "restaurant", label: "Restaurant", filters: [f("amenity", "restaurant|fast_food|food_court")] },
  { id: "cafe", label: "Cafe", filters: [f("amenity", "cafe|ice_cream")] },
  { id: "bakery", label: "Bakery & sweets", filters: [f("shop", "bakery|confectionery|pastry")] },
  { id: "salon", label: "Salon & barber", filters: [f("shop", "hairdresser|beauty|barber|massage|nails|cosmetics")] },
  { id: "gym", label: "Gym & fitness", filters: [f("leisure", "fitness_centre|sports_centre")] },
  { id: "clinic", label: "Clinic & dentist", filters: [f("amenity", "clinic|doctors|dentist"), f("healthcare", "clinic|doctor|dentist|physiotherapist")] },
  { id: "pharmacy", label: "Pharmacy", filters: [f("amenity", "pharmacy")] },
  { id: "shop", label: "Shop (any)", filters: ['["shop"]'] },
  { id: "clothes", label: "Clothes & tailor", filters: [f("shop", "clothes|boutique|fabric|tailor|shoes"), f("craft", "tailor")] },
  { id: "mover", label: "Movers", filters: [f("office", "moving_company"), f("shop", "storage_rental")] },
  {
    id: "repair",
    label: "Repair shop",
    filters: [
      f("shop", "car_repair|repair|motorcycle_repair|tyres|electronics_repair"),
      f("craft", "electronics_repair|shoemaker|watchmaker|key_cutter|electrician|plumber|hvac"),
      f("amenity", "car_repair"),
    ],
  },
  { id: "carwash", label: "Car wash & detailing", filters: [f("amenity", "car_wash"), f("shop", "car_parts|car")] },
  { id: "hotel", label: "Hotel & guest house", filters: [f("tourism", "hotel|motel|guest_house|hostel|apartment")] },
  { id: "school", label: "School & academy", filters: [f("amenity", "school|kindergarten|college|driving_school|language_school|music_school|training")] },
  { id: "laundry", label: "Laundry & dry clean", filters: [f("shop", "laundry|dry_cleaning")] },
  { id: "realestate", label: "Real estate & offices", filters: [f("office", "estate_agent|lawyer|accountant|insurance|company|consulting")] },
  { id: "florist", label: "Florist & gifts", filters: [f("shop", "florist|gift|stationery")] },
  { id: "pet", label: "Pet & vet", filters: [f("shop", "pet"), f("amenity", "veterinary")] },
];

export const CUSTOM_CATEGORY_ID = "custom";

/** Escape text so it is safe inside an Overpass QL regex string. */
function escapeForQl(text: string): string {
  return text.replace(/[\\.^$|?*+()[\]{}]/g, "\\$&").replace(/"/g, '\\"');
}

/** Filters for a free-text category: match typed words against common business tags and the name. */
export function customFilters(text: string): string[] {
  const t = escapeForQl(text.trim().toLowerCase().replace(/\s+/g, "_"));
  const name = escapeForQl(text.trim());
  const keys = ["amenity", "shop", "craft", "office", "leisure", "tourism", "healthcare"];
  return [...keys.map((k) => `["${k}"~"${t}",i]`), `["name"~"${name}",i]`];
}

export function resolveCategory(categoryId: string, customText: string): { label: string; filters: string[] } | null {
  if (categoryId === CUSTOM_CATEGORY_ID) {
    const text = customText.trim();
    return text.length >= 2 ? { label: text, filters: customFilters(text) } : null;
  }
  const c = CATEGORIES.find((x) => x.id === categoryId);
  return c ? { label: c.label, filters: c.filters } : null;
}

/** Human label for an OSM element, from its tags. */
export function labelFromTags(tags: Record<string, string>): string {
  for (const key of ["amenity", "shop", "craft", "office", "leisure", "tourism", "healthcare"]) {
    const v = tags[key];
    if (v && v !== "yes") return humanize(v);
  }
  return "Business";
}

function humanize(v: string): string {
  const s = v.split(";")[0].replace(/_/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}
