import { Hero } from "@/components/sections/Hero";
import { FeaturedOffers } from "@/components/sections/FeaturedOffers";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { AnkaufPanel } from "@/components/sections/AnkaufPanel";
import { WerkstattGrid } from "@/components/sections/WerkstattGrid";
import { WhyKallies } from "@/components/sections/WhyKallies";
import { Finanzierung } from "@/components/sections/Finanzierung";
import { Reviews } from "@/components/sections/Reviews";
import { Standort } from "@/components/sections/Standort";
import { MagazinTeaser } from "@/components/sections/MagazinTeaser";
import { Faq } from "@/components/sections/Faq";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Home() {
  usePageMeta(
    "Kallies Automobile Zeitz – Autohaus für Neu-, Gebraucht- und Oldtimer-Fahrzeuge",
    "Kallies Automobile in Zeitz: Neu- und Gebrauchtwagen, Oldtimer, Gebrauchtwagen-Ankauf und Werkstattservice. Inhabergeführt seit 1995 – 4,7/5 Sterne bei 623 Bewertungen.",
  );
  return (
    <>
      <Hero />
      <FeaturedOffers />
      <BrandStrip />
      <AnkaufPanel />
      <WerkstattGrid />
      <WhyKallies />
      <Finanzierung />
      <Reviews />
      <Standort />
      <MagazinTeaser />
      <Faq />
    </>
  );
}
