// Contact details used across the page.
// WhatsApp number: country code + number, digits only (no +, spaces or dashes).
// Pakistan example: "923361710242"
// You can also set them as NEXT_PUBLIC_WHATSAPP_NUMBER / NEXT_PUBLIC_EMAIL in Vercel.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923361710242";
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "4aminkarachi333@gmail.com";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const WHATSAPP_MESSAGE = "Hi Ali, I'd like to discuss a website.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const MAILTO_URL = `mailto:${EMAIL}`;

export const projects = [
  {
    name: "Orient Group Gulf",
    description: "HVAC & refrigeration materials supplier in Kuwait, with a B2B catalog and WhatsApp quotes.",
    tags: ["B2B catalog", "WhatsApp quotes", "EN/AR"],
    badge: "Preview",
    href: "https://orient-group-gulf.vercel.app",
    image: "/projects/orient-group-gulf.png",
  },
  {
    name: "Dacha",
    description: "Real estate agency redesign concept, Dubai.",
    tags: ["Real estate", "Redesign"],
    badge: "Concept",
    href: "https://dacha-psi-one.vercel.app",
    image: "/projects/dacha.png",
  },
  {
    name: "Dhil Al Shams",
    description: "Car parking shades and tents, Sharjah.",
    tags: ["Local business", "Lead generation"],
    badge: "Preview",
    href: "https://dhil-al-shams.vercel.app",
    image: "/projects/dhil-al-shams.png",
  },
] as const;
