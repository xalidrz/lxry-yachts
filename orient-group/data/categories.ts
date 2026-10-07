export type CategorySlug = "hvac" | "fixing-systems" | "electrical" | "bearings";

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Short name for filter pills and breadcrumbs. */
  title: string;
  /** Used on the category card and as meta description. */
  summary: string;
  /** Intro paragraph on the category page. */
  intro: string;
  /** Lucide icon key, resolved in components/category-icon.tsx. */
  icon: "snowflake" | "bolt" | "zap" | "cog";
};

export const categories: Category[] = [
  {
    slug: "hvac",
    name: "HVAC",
    title: "HVAC",
    summary:
      "Copper pipes and coils, refrigerant gases, insulation, ducting, AC spare parts and installation tools.",
    intro:
      "Everything an HVAC installer or maintenance team needs on one order: Venture copper pipe and coils, refrigerant gases, thermal insulation, flexible ducting, sealants, electrical spares and cleaning chemicals.",
    icon: "snowflake",
  },
  {
    slug: "fixing-systems",
    name: "Fixing Systems",
    title: "Fixing Systems",
    summary:
      "Bossong chemical anchors for concrete and masonry, and Unistrut slotted channels with accessories.",
    intro:
      "Chemical anchors from Bossong for concrete, brick and masonry fixings, plus Unistrut slotted channels and accessories for supporting pipework, trays and services.",
    icon: "bolt",
  },
  {
    slug: "electrical",
    name: "Electrical",
    title: "Electrical",
    summary:
      "Conduit and fittings, power and data cables, switchgear and earthing equipment.",
    intro:
      "Conduit pipes and brass fittings, power, control and data cables, and the switchgear and earthing equipment used on MEP projects across Kuwait.",
    icon: "zap",
  },
  {
    slug: "bearings",
    name: "Bearings",
    title: "Bearings",
    summary: "NSK deep groove, angular contact and self-aligning ball bearings.",
    intro:
      "NSK ball bearings for motors, pumps, fans and general machinery. Tell us the bearing number and we will confirm availability and price.",
    icon: "cog",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
