import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Accent } from "@/components/SectionHeading";
import { Gallery } from "@/components/sections/Gallery";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Wedding } from "@/components/sections/Wedding";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { site, telHref } from "@/lib/site";

export function WeddingPage() {
  usePageMeta("/wedding-lighting");
  return (
    <>
      <PageHero
        crumb="Wedding Lighting"
        eyebrow="Wedding lighting Edmonton"
        title={
          <>
            Wedding &amp; event lighting that <Accent>glows</Accent>
          </>
        }
        intro="Full house lighting, entrance decor, fairy-light canopies and drapes for weddings, mehndi, sangeet, receptions and festivals — set up and taken down for you."
        image="/photos/wedding-entrance-decor.webp"
        imagePosition="50% 55%"
      >
        <Button asChild size="lg">
          <Link to="/contact?service=Wedding%20Lighting">Check my date</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={telHref}>
            <Phone /> {site.phoneDisplay}
          </a>
        </Button>
      </PageHero>
      <Wedding bare />
      <Gallery category="wedding" heading={{ eyebrow: "Recent celebrations", title: <>Homes we've <Accent>lit up</Accent></>, intro: "Real Edmonton homes and venues. Tap a photo to see it full size." }} />
      <HowItWorks />
      <CtaBand service="Wedding Lighting" />
    </>
  );
}
