/**
 * Single source of truth for business details. Edit here — every section reads from this file.
 */
const encode = encodeURIComponent;

export const site = {
  name: "PB10 Electrical + Wedding Lighting Decor",
  shortName: "PB10 Electrical",
  phoneDisplay: "+1 780-802-0014",
  phoneTel: "+17808020014",
  addressLines: ["3113 31 Ave NW", "Edmonton, AB T6T 1W8", "Canada"],
  addressOneLine: "3113 31 Ave NW, Edmonton, AB T6T 1W8, Canada",
  /** Google rating shown in the hero and the Reviews section. */
  rating: 4.6,
  /**
   * "Read all reviews on Google" target. Currently a Google Maps search for the business — replace it with
   * the direct review link from the Google Business Profile (Share → "Ask for reviews") when you have it.
   */
  googleReviewsUrl: `https://www.google.com/maps/search/?api=1&query=${encode("PB10 Electrical 3113 31 Ave NW Edmonton AB")}`,
  /**
   * Where the quote form goes (see README → "Contact form"). Set VITE_FORM_ENDPOINT (Formspree, Web3Forms,
   * Getform… any service that accepts a JSON POST) and/or VITE_CONTACT_EMAIL for a mailto: fallback.
   */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "",
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? "",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export const telHref = `tel:${site.phoneTel}`;
export const mapEmbedSrc = `https://www.google.com/maps?q=${encode(site.addressOneLine)}&output=embed`;
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encode(site.addressOneLine)}`;

export const navLinks = [
  { label: "Electrical", href: "#electrical" },
  { label: "Wedding Lighting", href: "#wedding" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;
