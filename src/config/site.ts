/**
 * Single source of truth for business info. Everything on the site (status
 * badges, hours table, footer, booking form, JSON-LD) reads from here.
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
  // Centre of the Plus Code cell 849VMW36+PM (MW36+PM Hayward), about 14 m across. Replace with a
  // surveyed pin if you have one.
  geo: { lat: 37.654312, lng: -122.088312 },
  phone: { display: "(510) 363-8275", tel: "+15103638275" },
  rating: { value: 4.7, count: 51 },
  // From the oldest Google review (2017).
  customersSince: 2017,
  wheelchairAccessible: true,
  // Facts from the shop's Google Business Profile.
  profile: {
    accessibility: ["Wheelchair accessible entrance", "Wheelchair accessible parking lot"],
    parking: "On-site parking",
    payments: ["Credit cards", "Debit cards", "NFC mobile payments"],
    appointments: "Appointments recommended",
  },
  hours: {
    timeZone: "America/Los_Angeles",
    // Monday first. open/close are 24h "HH:MM"; null = closed all day.
    week: [
      { dow: 1, label: "Monday", short: "Mon", open: "09:00", close: "17:00" },
      { dow: 2, label: "Tuesday", short: "Tue", open: "09:00", close: "17:00" },
      { dow: 3, label: "Wednesday", short: "Wed", open: "09:00", close: "17:00" },
      { dow: 4, label: "Thursday", short: "Thu", open: "09:00", close: "17:00" },
      { dow: 5, label: "Friday", short: "Fri", open: "09:00", close: "17:00" },
      { dow: 6, label: "Saturday", short: "Sat", open: null, close: null },
      { dow: 0, label: "Sunday", short: "Sun", open: null, close: null },
    ],
  },
  reviewTags: [
    { label: "Trustworthy mechanic", count: 7 },
    { label: "Helpful owner", count: 4 },
    { label: "Honest work", count: 2 },
    { label: "Cost savings", count: 2 },
  ],
} as const;

export type HoursDay = (typeof site.hours.week)[number];

const addr = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
const q = encodeURIComponent(`${site.shortName} ${addr}`);

export const links = {
  tel: `tel:${site.phone.tel}`,
  addressLine: addr,
  place: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`,
  // The business's own Google Maps listing (directions, photos, reviews).
  business: "https://maps.app.goo.gl/9wLhfZWCG92QVbaA8",
  reviews: `https://www.google.com/maps/search/?api=1&query=${q}`,
  // Opens the Google Maps listing, where "Write a review" is one tap away. Swap in the direct
  // https://search.google.com/local/writereview?placeid=<PLACE_ID> link once you have the Place ID.
  writeReview: `https://www.google.com/maps/search/?api=1&query=${q}`,
};
