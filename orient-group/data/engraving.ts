import type { Locale } from "@/lib/i18n";

/** Engraving and labelling services. The home page shows the first four; /engraving shows all. */
export type EngravingItem = {
  icon: "tag" | "cable" | "panel" | "signpost" | "scissors" | "gift" | "layers" | "tree" | "frame";
  title: string;
  text: string;
};

const core: Record<Locale, EngravingItem[]> = {
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

/** Extra services shown on the Engraving page only. */
const more: Record<Locale, EngravingItem[]> = {
  en: [
    {
      icon: "scissors",
      title: "Print & profile-cut stickers",
      text: "Pipe markers cut to shape, such as “Chilled Water Return” and “Sprinkler Water”.",
    },
    { icon: "gift", title: "Promotional product marking", text: "Pens, mugs, rulers and similar items." },
    { icon: "layers", title: "Acrylic cutting", text: "Acrylic cut to size and shape." },
    { icon: "tree", title: "Timber & glass marking", text: "Engraved marking on timber and glass." },
    {
      icon: "frame",
      title: "Signage types",
      text: "A-frames, Colorbond signs, plaques and Corflute signs. All UV-rated and durable outdoors.",
    },
  ],
  ar: [
    {
      icon: "scissors",
      title: "ملصقات مطبوعة ومقصوصة بالشكل",
      text: "علامات أنابيب مقصوصة بالشكل، مثل «Chilled Water Return» و«Sprinkler Water».",
    },
    { icon: "gift", title: "طباعة وحفر على المنتجات الترويجية", text: "أقلام وأكواب ومساطر وما شابهها." },
    { icon: "layers", title: "قص الأكريليك", text: "قص الأكريليك حسب المقاس والشكل." },
    { icon: "tree", title: "حفر على الخشب والزجاج", text: "حفر وتعليم على الخشب والزجاج." },
    {
      icon: "frame",
      title: "أنواع اللافتات",
      text: "لافتات A-frame ولافتات Colorbond ولوحات ولافتات Corflute. جميعها مقاومة للأشعة فوق البنفسجية ومتينة في الأماكن المكشوفة.",
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

/** The four core services (home page). */
export function getEngravingItems(locale: Locale) {
  return core[locale];
}

/** All services (Engraving page). */
export function getAllEngravingServices(locale: Locale) {
  return [...core[locale], ...more[locale]];
}

export function getLabelListChecklist(locale: Locale) {
  return checklist[locale];
}
