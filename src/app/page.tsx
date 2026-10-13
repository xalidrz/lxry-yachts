import { Hero } from "@/components/hero";
import { Options } from "@/components/sections/options";
import { Shop } from "@/components/sections/shop";
import { Services } from "@/components/sections/services";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <Options />
      <Shop />
      <Services preview />
      <CtaBand />
    </>
  );
}
