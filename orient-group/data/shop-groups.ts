import { getAllEngravingServices } from "./engraving";
import { products, type Product } from "./products";

/**
 * "Shop by category" tiles on the home page. Each tile shows a photo and links
 * to /products?group=<key>, which filters the product list. The engraving tile
 * links to the Engraving page instead.
 */
export type ShopGroupKey =
  | "gases"
  | "copper"
  | "ducts"
  | "electrical"
  | "fixing"
  | "engraving";

export type ShopGroup = {
  key: ShopGroupKey;
  /** Tile photo. Without one, the tile shows a dark panel with an icon. */
  image?: string;
  /** Products in this group; omitted for the engraving tile. */
  match?: (product: Product) => boolean;
  /** Page the tile links to when it is not a product filter. */
  href?: string;
};

const inList = (slugs: string[]) => (p: Product) => slugs.includes(p.slug);

export const shopGroups: ShopGroup[] = [
  {
    key: "gases",
    image: "/products/refrigerant-gases.jpg",
    match: (p) => p.slug.endsWith("-refrigerant-gas"),
  },
  {
    key: "copper",
    image: "/products/copper-coil-refrigeration-tube-venture.jpg",
    match: inList(["pancake-copper-coils", "straight-copper-pipe-type-k-l-m"]),
  },
  {
    key: "ducts",
    image: "/products/flexible-duct-insulated-duraflex.jpg",
    match: inList([
      "flexible-ducts-and-duct-connectors",
      "canvas-cloth-for-ducting",
      "duct-sealants-and-adhesives",
    ]),
  },
  {
    key: "electrical",
    image: "/products/capacitors-amber-range.jpg",
    match: (p) => p.category === "electrical" || p.slug === "capacitors-and-contactors",
  },
  {
    key: "fixing",
    image: "/products/threaded-rods-nuts-washers-bolts-tembo.jpg",
    match: (p) => p.category === "fixing-systems",
  },
  { key: "engraving", href: "/engraving" },
];

export function isShopGroupKey(value: string | null): value is ShopGroupKey {
  return shopGroups.some((g) => g.key === value);
}

/** Slugs of the products in a group (empty for the engraving tile). */
export function getGroupSlugs(key: ShopGroupKey): string[] {
  const group = shopGroups.find((g) => g.key === key);
  return group?.match ? products.filter(group.match).map((p) => p.slug) : [];
}

/** Number shown on a tile: products, or services for the engraving tile. */
export function getGroupCount(group: ShopGroup, locale: "en" | "ar" = "en") {
  return group.match
    ? products.filter(group.match).length
    : getAllEngravingServices(locale).length;
}
