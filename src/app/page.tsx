import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { Services } from "@/components/services";
import { Gallery } from "@/components/gallery";
import { WhyElite } from "@/components/why-elite";
import { Reviews } from "@/components/reviews";
import { Location } from "@/components/location";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services preview />
      <Gallery preview />
      <WhyElite />
      <Reviews preview />
      <Location preview />
    </>
  );
}
