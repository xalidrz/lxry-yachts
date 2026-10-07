import type { Locale } from "@/lib/i18n";

/** Engraving and labelling services, shown on the home page and on /engraving. */
export type EngravingItem = {
  icon: "tag" | "cable" | "panel" | "signpost";
  title: string;
  text: string;
};

const items: Record<Locale, EngravingItem[]> = {
  en: [
    { icon: "tag", title: "Valve tags", text: "Engraved traffolyte and stainless steel." },
    { icon: "cable", title: "Cable markers", text: "Markers for identifying cables and circuits." },
    { icon: "panel", title: "Switchboard labels", text: "Engraved plastic and etched aluminium." },
    {
      icon: "signpost",
      title: "Signage and stickers",
      text: "UV-rated small signs, plaques, print-and-cut stickers.",
    },
  ],
  ar: [
    { icon: "tag", title: "لوحات تعريف الصمامات", text: "تراوفوليت محفور وستانلس ستيل." },
    { icon: "cable", title: "علامات الكابلات", text: "علامات لتمييز الكابلات والدوائر." },
    { icon: "panel", title: "ملصقات لوحات التوزيع", text: "بلاستيك محفور وألمنيوم محفور كيميائياً." },
    {
      icon: "signpost",
      title: "اللافتات والملصقات",
      text: "لافتات صغيرة مقاومة للأشعة فوق البنفسجية، لوحات، وملصقات مطبوعة ومقصوصة.",
    },
  ],
};

/** What a customer should include when sending a label list. */
const checklist: Record<Locale, string[]> = {
  en: [
    "The exact text for each tag or label, one line per item",
    "Quantity of each",
    "Size, or the space it has to fit",
    "Material and colour, if you have a project specification",
    "How it will be fixed: holes, chain, cable tie or adhesive",
    "Your delivery date and site location",
  ],
  ar: [
    "النص الدقيق لكل لوحة أو ملصق، سطر لكل بند",
    "الكمية المطلوبة من كل بند",
    "المقاس، أو المساحة التي يجب أن يناسبها",
    "المادة واللون، إن وُجدت مواصفات للمشروع",
    "طريقة التثبيت: ثقوب أو سلسلة أو رباط كابل أو لاصق",
    "موعد التسليم وموقع المشروع",
  ],
};

export function getEngravingItems(locale: Locale) {
  return items[locale];
}

export function getLabelListChecklist(locale: Locale) {
  return checklist[locale];
}
