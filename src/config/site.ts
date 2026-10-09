/**
 * Single source of truth for business info.
 *
 * PLACEHOLDERS: `hours.opens` and `hours.days` are NOT confirmed. Only the 5 PM
 * closing time is known. Replace them with the real values, then set
 * `hours.confirmed` to true. Everything on the site (open-now badge, footer,
 * location card, JSON-LD) reads from here.
 */
export const site = {
  name: "ELITE MOTORSPORTS",
  shortName: "Elite Motorsports",
  type: "Auto repair shop",
  owner: "Goldy",
  tagline: "Honest Repairs. Hayward's 4.7★ Shop.",
  description:
    "Owner-run auto repair at 70 W Jackson St, Hayward, CA. Uber inspections, oil changes, diagnostics, electrical, clutch and mirror repair. 4.7★ from 51 Google reviews.",
  address: {
    street: "70 W Jackson St",
    city: "Hayward",
    region: "CA",
    postalCode: "94544",
    country: "US",
    plusCode: "MW36+PM Hayward",
  },
  phone: { display: "(510) 363-8275", tel: "+15103638275" },
  rating: { value: 4.7, count: 51 },
  wheelchairAccessible: true,
  hours: {
    timeZone: "America/Los_Angeles",
    // PLACEHOLDER: opening time (24h "HH:MM"), days (0 = Sunday … 6 = Saturday)
    opens: "09:00",
    days: [1, 2, 3, 4, 5, 6],
    // Known: closes at 5 PM
    closes: "17:00",
    closesLabel: "5 PM",
    confirmed: false,
  },
  reviewTags: [
    { label: "Trustworthy mechanic", count: 7 },
    { label: "Helpful owner", count: 4 },
    { label: "Honest work", count: 2 },
    { label: "Cost savings", count: 2 },
  ],
} as const;

const addr = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
const q = encodeURIComponent(`${site.shortName} ${addr}`);

export const links = {
  tel: `tel:${site.phone.tel}`,
  addressLine: addr,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`,
  reviews: `https://www.google.com/maps/search/?api=1&query=${q}`,
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(addr)}&output=embed`,
};
