import { links, site } from "@/config/site";
import { openingHoursSpec } from "@/lib/hours";
import { siteUrl } from "@/lib/url";

/** AutoRepair structured data, rendered on every page. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${siteUrl}/#business`,
    name: site.shortName,
    url: siteUrl,
    image: `${siteUrl}/og.jpg`,
    telephone: site.phone.tel,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    openingHoursSpecification: openingHoursSpec(),
    amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Wheelchair accessible", value: true }],
    hasMap: links.directions,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
