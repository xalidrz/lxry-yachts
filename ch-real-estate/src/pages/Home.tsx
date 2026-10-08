import { Hero } from "@/components/sections/Hero";
import { Properties } from "@/components/sections/Properties";
import { Construction } from "@/components/sections/Construction";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Converter } from "@/components/sections/Converter";
import { CtaBand } from "@/components/CtaBand";
import { usePageMeta } from "@/lib/seo";

export default function Home() {
  usePageMeta("/");
  return (
    <>
      <Hero />
      <Properties />
      <Construction />
      <Process />
      <Projects />
      <WhyChoose />
      <Converter />
      <CtaBand />
    </>
  );
}
