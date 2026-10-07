/** Single source of truth for business details used across the site. */

export const SITE_NAME = "Orient Group Gulf";
export const LEGAL_NAME = "Orient Group Gulf General Trading Co.";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orientgroupkwt.com"
).replace(/\/$/, "");
export const FOUNDED_YEAR = 2010;

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

export const EMAILS = [
  { label: "Sales", address: "mechorient@gmail.com" },
  { label: "Import", address: "orientgroup.kwt@gmail.com" },
  { label: "General", address: "info@orientgroupkwt.com" },
];

/** WhatsApp number (international format, digits only) used by every "Ask for price" button. */
export const WHATSAPP_NUMBER = "96590950709";

export const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/#brands" },
  { label: "Engraving", href: "/#engraving" },
  { label: "Contact", href: "/contact" },
] as const;
