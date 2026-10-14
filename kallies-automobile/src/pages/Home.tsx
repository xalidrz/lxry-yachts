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
import { useI18n } from "@/i18n";

export default function Home() {
  const { t } = useI18n();
  usePageMeta(t.meta.home.title, t.meta.home.desc);
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
