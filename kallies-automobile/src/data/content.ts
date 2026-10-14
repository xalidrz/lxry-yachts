import { Award, Gauge, Wrench, CarFront, ShieldCheck, Handshake, Search, type LucideIcon } from "lucide-react";

/**
 * Text lives in src/i18n; this file only holds the language-independent parts (icons, images, dates),
 * matched to the dictionary entries by index.
 */
export const serviceIcons: LucideIcon[] = [ShieldCheck, CarFront, Wrench, Gauge];
export const reasonIcons: LucideIcon[] = [Search, Award, Handshake];

/** The reviews are placeholders until the dealer supplies the real Google/Trustindex ones. */
export const REVIEWS_ARE_PLACEHOLDER = true;

/** Real post dates from kallies-automobile.de/magazin. */
export const postMeta = [
  { slug: "suv-verkaufen", date: "2026-07-02", image: "/images/magazin-suv.webp" },
  { slug: "tesla-inzahlungnahme", date: "2026-07-02", image: "/images/magazin-tesla.webp" },
  { slug: "gelaendewagen-guenstig", date: "2024-11-07", image: "/images/magazin-gelaende.webp" },
] as const;
