import { CtaBand } from "@/components/CtaBand";
import { Electrical } from "@/components/sections/Electrical";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Wedding } from "@/components/sections/Wedding";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { usePageMeta } from "@/hooks/usePageMeta";

export function Home() {
  usePageMeta("/");
  return (
    <>
      <Hero />
      <Electrical more />
      <Wedding more />
      <Gallery limit={6} />
      <HowItWorks />
      <Reviews />
      <WhyChoose />
      <CtaBand />
    </>
  );
}
