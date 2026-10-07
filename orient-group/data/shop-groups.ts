import type { Locale } from "@/lib/i18n";
import { getAllEngravingServices } from "./engraving";
import { localizeProduct, products, type Product } from "./products";

/**
 * Product groups used by the mega menu, the "shop by category" tiles on the
 * home page and the /products?group= filter. Every product belongs to exactly
 * one group. The engraving group has no products: it links to /engraving.
 */
export type ShopGroupKey =
  | "gases"
  | "copper"
  | "ducts"
  | "hvacParts"
  | "electrical"
  | "fixing"
  | "bearings"
  | "engraving";

export type ShopGroup = {
  key: ShopGroupKey;
  icon: "snowflake" | "cylinder" | "wind" | "wrench" | "zap" | "bolt" | "cog" | "tag";
  /** Tile photo. Without one, the tile shows a dark panel with an icon. */
  image?: string;
  /** Products in this group; omitted for the engraving group. */
  match?: (product: Product) => boolean;
  /** Slugs listed first, in this order (the rest follow in catalogue order). */
  order?: string[];
  /** Page the group links to when it is not a product filter. */
  href?: string;
};

const inList = (slugs: string[]) => (p: Product) => slugs.includes(p.slug);

export const shopGroups: ShopGroup[] = [
  {
    key: "gases",
    icon: "snowflake",
    image: "/products/refrigerant-gases.jpg",
    match: (p) => p.slug.endsWith("-refrigerant-gas"),
    order: [
      "r22-refrigerant-gas",
      "r32-refrigerant-gas",
      "r410a-refrigerant-gas",
      "r404a-refrigerant-gas",
      "r407c-refrigerant-gas",
      "r134a-refrigerant-gas",
      "r600-refrigerant-gas",
    ],
  },
  {
    key: "copper",
    icon: "cylinder",
    image: "/products/copper-coil-refrigeration-tube-venture.jpg",
    match: inList(["pancake-copper-coils", "straight-copper-pipe-type-k-l-m"]),
  },
  {
    key: "ducts",
    icon: "wind",
    image: "/products/flexible-duct-insulated-duraflex.jpg",
    match: inList([
      "flexible-ducts-and-duct-connectors",
      "canvas-cloth-for-ducting",
      "duct-sealants-and-adhesives",
    ]),
  },
  {
    key: "hvacParts",
    icon: "wrench",
    image: "/products/thermal-insulation-pipes.jpg",
    match: inList([
      "thermal-insulation",
      "condenser-motors-and-ac-spare-parts",
      "coil-cleaners-and-maintenance-chemicals",
      "installation-tools-and-accessories",
    ]),
  },
  {
    key: "electrical",
    icon: "zap",
    image: "/products/capacitors-amber-range.jpg",
    match: (p) => p.category === "electrical" || p.slug === "capacitors-and-contactors",
    order: ["capacitors-and-contactors"],
  },
  {
    key: "fixing",
    icon: "bolt",
    image: "/products/threaded-rods-nuts-washers-bolts-tembo.jpg",
    match: (p) => p.category === "fixing-systems",
  },
  {
    key: "bearings",
    icon: "cog",
    image: "/products/deep-groove-ball-bearing.jpg",
    match: (p) => p.category === "bearings",
  },
  { key: "engraving", icon: "tag", href: "/engraving" },
];

export function isShopGroupKey(value: string | null): value is ShopGroupKey {
  return shopGroups.some((g) => g.key === value);
}

function groupProducts(group: ShopGroup): Product[] {
  if (!group.match) return [];
  const list = products.filter(group.match);
  const order = group.order ?? [];
  return [
    ...order.map((slug) => list.find((p) => p.slug === slug)).filter((p): p is Product => !!p),
    ...list.filter((p) => !order.includes(p.slug)),
  ];
}

/** Slugs of the products in a group (empty for the engraving group). */
export function getGroupSlugs(key: ShopGroupKey): string[] {
  const group = shopGroups.find((g) => g.key === key);
  return group ? groupProducts(group).map((p) => p.slug) : [];
}

/** "R22 Refrigerant Gas" -> "R22", for compact lists. */
function shortLabel(name: string) {
  return name.replace(/\s*Refrigerant Gas$/, "").replace(/^غاز التبريد\s*/, "");
}

/** Sub-items of a group, in the page language: products, or engraving services. */
export function getGroupItems(group: ShopGroup, locale: Locale) {
  if (group.match) {
    return groupProducts(group).map((p) => ({
      slug: p.slug,
      label: shortLabel(localizeProduct(p, locale).name),
    }));
  }
  return getAllEngravingServices(locale).map((s) => ({ slug: "", label: s.title }));
}

/** Number shown on a tile: products, or services for the engraving tile. */
export function getGroupCount(group: ShopGroup, locale: Locale = "en") {
  return group.match ? groupProducts(group).length : getAllEngravingServices(locale).length;
}
