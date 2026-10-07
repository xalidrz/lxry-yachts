/** Single source of truth for business details used across the site. */

export const SITE_NAME = "Orient Group Gulf";
export const LEGAL_NAME = "Orient Group Gulf General Trading Co.";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orientgroupkwt.com"
).replace(/\/$/, "");
export const FOUNDED_YEAR = 2010;

/**
 * Search engines may index the site only when NEXT_PUBLIC_ALLOW_INDEXING is exactly "true".
 * Any other value (or none) keeps every page noindex/nofollow and robots.txt on "Disallow: /".
 * The value is read at build time, so redeploy after changing it.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/**
 * Google Maps link for the address. Replace this one constant with the exact
 * pin link (Share > Copy link in Google Maps) when it is available.
 */
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Homaizi+Complex+Khalifa+Al-Jassim+Street+Shuwaikh+Kuwait";

export const ADDRESS_LINES = [
  "Shop No. 12, Homaizi Complex, Building No. 99,",
  "Khalifa Al-Jassim Street,",
  "Shuwaikh Industrial Area, Kuwait",
];
/** Arabic address. Please confirm the spelling of the complex name with the client. */
export const ADDRESS_LINES_AR = [
  "محل رقم 12، مجمع الحميضي، مبنى رقم 99،",
  "شارع خليفة الجاسم،",
  "منطقة الشويخ الصناعية، الكويت",
];
export const ADDRESS_ONE_LINE = ADDRESS_LINES.join(" ").replace(/,\s+/g, ", ");

export type PhoneNumber = { label: string; display: string; tel: string };

export const OFFICE_PHONE: PhoneNumber = {
  label: "Office",
  display: "2492 1705",
  tel: "+96524921705",
};
export const FAX = { label: "Fax", display: "2492 1706" };
export const MOBILES: PhoneNumber[] = [
  { label: "Mobile", display: "9095 0709", tel: "+96590950709" },
  { label: "Mobile", display: "9696 4571", tel: "+96596964571" },
];

/** Shown in this order: general first, then sales and import. */
export const EMAILS = [
  { label: "General", address: "info@orientgroupkwt.com" },
  { label: "Sales", address: "mechorient@gmail.com" },
  { label: "Import", address: "orientgroup.kwt@gmail.com" },
];

/**
 * PLACEHOLDER opening hours: edit these lines (one entry per line) before launch.
 * They are shown on the Contact page.
 */
export const OPENING_HOURS = {
  en: ["Saturday to Thursday: 8:00 AM – 5:00 PM", "Friday: Closed"],
  ar: ["من السبت إلى الخميس: 8:00 صباحاً – 5:00 مساءً", "الجمعة: مغلق"],
};

/** Embedded Google Map on the Contact page (search by address; no API key needed). */
export const GOOGLE_MAPS_EMBED_URL = (hl: "en" | "ar") =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    "Homaizi Complex, Khalifa Al-Jassim Street, Shuwaikh Industrial Area, Kuwait",
  )}&hl=${hl}&z=16&output=embed`;

/**
 * Social media links. Leave a url empty and that icon is not shown, so only
 * fill in the accounts that are active.
 */
export const SOCIAL_LINKS: { platform: "facebook" | "instagram" | "linkedin" | "youtube" | "tiktok"; url: string }[] = [
  { platform: "facebook", url: "https://www.facebook.com/orientgroupkwt" },
  { platform: "instagram", url: "" },
  { platform: "linkedin", url: "" },
  { platform: "youtube", url: "" },
  { platform: "tiktok", url: "" },
];

/** WhatsApp number (international format, digits only) used by every "Ask for price" button. */
export const WHATSAPP_NUMBER = "96590950709";

/** Main navigation. Labels come from the dictionary (`nav`). */
export const NAV_LINKS = [
  { key: "products", href: "/products" },
  { key: "about", href: "/about" },
  { key: "brands", href: "/brands" },
  { key: "engraving", href: "/engraving" },
  { key: "contact", href: "/contact" },
] as const;
