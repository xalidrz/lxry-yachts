import { hours, site } from "@/data/site";

export function hairSalonJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${baseUrl}/#salon`,
    name: site.nameEn,
    alternateName: site.nameAr,
    url: baseUrl,
    image: `${baseUrl}/og.png`,
    logo: `${baseUrl}/logo.png`,
    telephone: site.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressCountry: site.address.countryCode,
    },
    hasMap: site.mapsPlaceUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(site.rating),
      reviewCount: String(site.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: hours.opensAt,
        closes: hours.closesAt,
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Good for kids", value: true },
    ],
    sameAs: [site.facebook],
  };
}
