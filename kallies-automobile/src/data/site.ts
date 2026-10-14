export const site = {
  name: "Kallies Automobile",
  legalName: "Kallies Automobile e.K.",
  phone: "+49 3441 86030",
  phoneHref: "tel:+49344186030",
  whatsapp: "https://wa.me/491728628238",
  email: "info@automobile-kallies.de",
  address: { street: "Am Herrmannschacht 1", zip: "06712", city: "Zeitz" },
  /** Labels come from the dictionary (standort.days); times are 24 h in both languages. */
  hours: [
    { key: "weekdays", open: "8:30", close: "18:00" },
    { key: "saturday", open: "9:00", close: "12:00" },
    { key: "sunday", open: null, close: null },
  ] as const,
  since: 1995,
  rating: { value: 4.7, outOf: 5, count: 623 },
  customers: 10000,
} as const;

export const mapsEmbedUrl = "https://www.google.com/maps?q=Am+Herrmannschacht+1,+06712+Zeitz&output=embed&hl=de";

/** `key` indexes the dictionary (nav.*). */
export const nav = [
  { key: "fahrzeuge", to: "/fahrzeuge" },
  { key: "oldtimer", to: "/oldtimer" },
  { key: "harley", to: "/harley-davidson" },
  { key: "marken", to: "/marken" },
  { key: "ankauf", to: "/ankauf" },
  { key: "werkstatt", to: "/werkstattservice" },
  { key: "karriere", to: "/karriere" },
  { key: "magazin", to: "/magazin" },
] as const;

/** `legal` links stay German in every language (the pages are Nur auf Deutsch verfügbar). */
export const footerLinks = [
  { key: "about", to: "/ueber-uns", legal: false },
  { key: "careers", to: "/karriere", legal: false },
  { key: "contact", to: "/kontakt", legal: false },
  { key: "magazine", to: "/magazin", legal: false },
  { key: "imprint", to: "/impressum", legal: true },
  { key: "privacy", to: "/datenschutz", legal: true },
  { key: "terms", to: "/agb", legal: true },
] as const;

/** Brand strip + brand overview. Text wordmarks only; no logo files. */
export const brands = ["Nissan", "Renault", "Dacia", "Mercedes-Benz", "Volkswagen", "Kia", "Ford", "Opel"] as const;
