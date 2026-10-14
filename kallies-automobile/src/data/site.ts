export const site = {
  name: "Kallies Automobile",
  legalName: "Kallies Automobile e.K.",
  phone: "+49 3441 86030",
  phoneHref: "tel:+49344186030",
  whatsapp: "https://wa.me/491728628238",
  email: "info@automobile-kallies.de",
  address: { street: "Am Herrmannschacht 1", zip: "06712", city: "Zeitz" },
  hours: [
    { days: "Montag – Freitag", time: "8:30 – 18:00 Uhr" },
    { days: "Samstag", time: "9:00 – 12:00 Uhr" },
    { days: "Sonntag", time: "Geschlossen" },
  ],
  since: 1995,
  rating: { value: "4,7", outOf: "5", count: 623 },
  customers: "10.000+",
} as const;

export const mapsEmbedUrl = "https://www.google.com/maps?q=Am+Herrmannschacht+1,+06712+Zeitz&output=embed&hl=de";

export const nav = [
  { label: "Fahrzeuge", to: "/fahrzeuge" },
  { label: "Oldtimer", to: "/oldtimer" },
  { label: "Harley-Davidson", to: "/harley-davidson" },
  { label: "Marken", to: "/marken" },
  { label: "Ankauf", to: "/ankauf" },
  { label: "Werkstattservice", to: "/werkstattservice" },
  { label: "Karriere", to: "/karriere" },
  { label: "Magazin", to: "/magazin" },
] as const;

export const footerLinks = [
  { label: "Über uns", to: "/ueber-uns" },
  { label: "Karriere", to: "/karriere" },
  { label: "Kontakt", to: "/kontakt" },
  { label: "Magazin", to: "/magazin" },
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "AGB", to: "/agb" },
] as const;

/** Brand strip + brand overview. Text wordmarks only; no logo files. */
export const brands = ["Nissan", "Renault", "Dacia", "Mercedes-Benz", "Volkswagen", "Kia", "Ford", "Opel"] as const;
