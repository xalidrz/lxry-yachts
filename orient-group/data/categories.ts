import type { Locale } from "@/lib/i18n";

export type CategorySlug = "hvac" | "fixing-systems" | "electrical" | "bearings";

type CategoryText = { name: string; title: string; summary: string; intro: string };

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
  /** Arabic text (Modern Standard Arabic). */
  ar: CategoryText;
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
    ar: {
      name: "التكييف والتبريد",
      title: "التكييف والتبريد",
      summary: "أنابيب ولفائف نحاسية، غازات تبريد، عزل، مجاري هواء، قطع غيار تكييف وأدوات تركيب.",
      intro:
        "كل ما يحتاجه فنيو تركيب وصيانة التكييف في طلب واحد: أنابيب ولفائف Venture النحاسية، غازات التبريد، العزل الحراري، مجاري الهواء المرنة، مواد الإحكام، القطع الكهربائية والمواد الكيميائية للتنظيف.",
    },
  },
  {
    slug: "fixing-systems",
    name: "Fixing Systems",
    title: "Fixing Systems",
    summary:
      "Bossong chemical anchors for concrete and masonry, Unistrut slotted channels, and Tembo hangers and threaded rods.",
    intro:
      "Chemical anchors from Bossong for concrete, brick and masonry fixings, plus Unistrut slotted channels and accessories, and Tembo pipe hangers and threaded rods for supporting pipework, trays and services.",
    icon: "bolt",
    ar: {
      name: "أنظمة التثبيت",
      title: "أنظمة التثبيت",
      summary: "مثبتات Bossong الكيميائية للخرسانة والطوب، قنوات Unistrut المثقبة، وعلّاقات وقضبان Tembo الملولبة.",
      intro:
        "مثبتات كيميائية من Bossong لأعمال التثبيت في الخرسانة والطوب، إضافة إلى قنوات Unistrut المثقبة وملحقاتها، وعلّاقات الأنابيب والقضبان الملولبة من Tembo لتعليق الأنابيب والحوامل والخدمات.",
    },
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
    ar: {
      name: "المواد الكهربائية",
      title: "الكهرباء",
      summary: "مواسير الكوندويت وملحقاتها، كابلات القدرة والبيانات، المفاتيح الكهربائية ومعدات التأريض.",
      intro:
        "مواسير الكوندويت والقطع النحاسية، كابلات القدرة والتحكم والبيانات، والمفاتيح الكهربائية ومعدات التأريض المستخدمة في مشاريع الأعمال الكهروميكانيكية في الكويت.",
    },
  },
  {
    slug: "bearings",
    name: "Bearings",
    title: "Bearings",
    summary: "NSK deep groove, angular contact and self-aligning ball bearings.",
    intro:
      "NSK ball bearings for motors, pumps, fans and general machinery. Tell us the bearing number and we will confirm availability and price.",
    icon: "cog",
    ar: {
      name: "المحامل",
      title: "المحامل",
      summary: "محامل NSK الكروية ذات الأخدود العميق والتلامس الزاوي وذاتية المحاذاة.",
      intro:
        "محامل NSK الكروية للمحركات والمضخات والمراوح والآلات العامة. أخبرنا برقم المحمل لنؤكد التوفر والسعر.",
    },
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

/** Category text in the requested language. */
export function localizeCategory(category: Category, locale: Locale): CategoryText {
  if (locale === "ar") return category.ar;
  const { name, title, summary, intro } = category;
  return { name, title, summary, intro };
}
