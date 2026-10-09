import { MotionProvider } from "@/components/motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { Services } from "@/components/services";
import { Gallery } from "@/components/gallery";
import { WhyElite } from "@/components/why-elite";
import { Reviews } from "@/components/reviews";
import { Location } from "@/components/location";
import { Footer } from "@/components/footer";
import { CallFab } from "@/components/call-fab";
import { links, site } from "@/config/site";
import { openingHoursSpec } from "@/lib/hours";
import { siteUrl } from "@/lib/url";

const jsonLd = {
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

export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Gallery />
        <WhyElite />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <CallFab />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </MotionProvider>
  );
}
