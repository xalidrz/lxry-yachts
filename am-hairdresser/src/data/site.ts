// Business facts in ONE place. Edit here; nothing else on the site hard-codes them.

export const site = {
  nameEn: "AM Hairdresser Salon",
  nameAr: "إي إم هيردريسر صالون",
  shortName: "AM Hairdresser",
  phoneDisplay: "+973 3563 4883",
  phoneShort: "3563 4883",
  phoneTel: "+97335634883",
  whatsappNumber: "97335634883",
  rating: 4.9,
  reviewCount: 83,
  address: {
    street: "Road 55, Shop 243P, Block 210",
    locality: "Muharraq",
    country: "Bahrain",
    countryCode: "BH",
  },
  plusCode: "7J48+5X Muharraq",
  facebook: "https://www.facebook.com/people/Am-Hair-Dresser-صالون-إي-إم/100083036093588/",
  // Google Maps search by plus code. Replace with the salon's own Google Maps / reviews link once you have it.
  mapsPlaceUrl: "https://www.google.com/maps/search/?api=1&query=7J48%2B5X%20Muharraq",
  mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=7J48%2B5X%20Muharraq",
  mapsEmbedUrl: "https://www.google.com/maps?q=7J48%2B5X%20Muharraq&hl=en&z=17&output=embed",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=AM%20Hairdresser%20Salon%207J48%2B5X%20Muharraq",
} as const;

// Opening hours — Bahrain time (Asia/Bahrain), same every day.
export const hours = {
  timeZone: "Asia/Bahrain",
  // PLACEHOLDER — replace with the real opening time (24h "HH:MM").
  // It is only used to decide the "Open now" badge and the JSON-LD hours; it is never printed on the page.
  opensAt: "09:00",
  closesAt: "00:30", // 12:30 AM, i.e. after midnight
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
