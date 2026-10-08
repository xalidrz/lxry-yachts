/**
 * Single source of truth for business details. Edit here — every section reads from this file.
 */
export const site = {
  name: "CH Real Estate & Builder's",
  shortName: "CH Real Estate & Builder's",
  city: "Wah Cantt",
  phoneDisplay: "0334 6352328",
  phoneTel: "+923346352328",
  /** WhatsApp wants the number in international format with no "+" or spaces. */
  whatsapp: "923346352328",
  email: "sajidsaeed265@gmail.com",
  addressLines: [
    "Shop No. GF-2, Rehan Heights, near Arcade Mall",
    "Main Boulevard, New City Phase II",
    "Wah Cantt, Rawalpindi 47040, Pakistan",
  ],
  addressOneLine:
    "Shop No GF-2, Rehan Heights, Near Arcade Mall, Main Boulevard, Phase 2 New City, Wah Cantt, 47040, Pakistan",
  hours: "Mon – Sat · 10:00 am – 7:00 pm",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.addressOneLine)}&output=embed`;
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.addressOneLine)}`;
