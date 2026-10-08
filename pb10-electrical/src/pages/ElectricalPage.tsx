import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Accent } from "@/components/SectionHeading";
import { Electrical } from "@/components/sections/Electrical";
import { Gallery } from "@/components/sections/Gallery";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { site, telHref } from "@/lib/site";

export function ElectricalPage() {
  usePageMeta("/electrical");
  return (
    <>
      <PageHero
        crumb="Electrical"
        eyebrow="Electrician in Edmonton"
        title={
          <>
            Electrical services, <Accent>done right</Accent>
          </>
        }
        intro="Residential wiring, panel upgrades, lighting, EV chargers, renovations and repairs — clear quotes, tidy work and jobs finished on time."
        image="/photos/electrical-feature-wall.webp"
        imagePosition="50% 30%"
      >
        <Button asChild size="lg">
          <Link to="/contact?service=Electrical">Get a Free Quote</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={telHref}>
            <Phone /> {site.phoneDisplay}
          </a>
        </Button>
      </PageHero>
      <Electrical bare />
      <Gallery category="electrical" heading={{ eyebrow: "Recent electrical work", title: <>Lighting we've <Accent>installed</Accent></>, intro: "A few finished projects. Tap a photo to see it full size." }} />
      <HowItWorks />
      <CtaBand service="Electrical" />
    </>
  );
}
