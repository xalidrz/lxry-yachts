import type { Locale } from "@/lib/i18n";

/** Photos on the About and Contact pages (files in /public/about). */
export type AboutImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

export const aboutImages = {
  /** Main About image. */
  team: {
    src: "/about/team-office.jpg",
    width: 1600,
    height: 1200,
    alt: {
      en: "The Orient Group Gulf team standing together in the office in Shuwaikh, Kuwait",
      ar: "فريق أورينت جروب جلف مجتمعاً في المكتب في الشويخ، الكويت",
    },
  },
  counter: {
    src: "/about/team-counter.jpg",
    width: 1000,
    height: 750,
    alt: {
      en: "Three Orient Group Gulf staff behind the sales counter, with stock shelves behind them",
      ar: "ثلاثة من موظفي أورينت جروب جلف خلف طاولة المبيعات وخلفهم أرفف المخزون",
    },
  },
  shopFront: {
    src: "/about/shop-front.jpg",
    width: 1600,
    height: 900,
    alt: {
      en: "The Orient Group Gulf shop front in Homaizi Complex, Shuwaikh, with stock visible through the open shutter",
      ar: "واجهة محل أورينت جروب جلف في مجمع الحميضي بالشويخ، ويظهر المخزون عبر الباب المفتوح",
    },
  },
  display: {
    src: "/about/refrigerant-display-shop.jpg",
    width: 900,
    height: 1600,
    alt: {
      en: "Display stand in the shop with refrigerant gas cans and flexible duct connectors",
      ar: "حامل عرض في المحل عليه علب غاز التبريد ووصلات مجاري الهواء المرنة",
    },
  },
} satisfies Record<string, AboutImage>;
