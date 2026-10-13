import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { Options } from "@/components/sections/options";
import { Shop } from "@/components/sections/shop";
import { Services } from "@/components/sections/services";
import { Location } from "@/components/sections/location";

// Below-the-fold interactive sections load their JavaScript separately from the hero.
const Process = dynamic(() => import("@/components/sections/process").then((m) => m.Process));
const Tracker = dynamic(() => import("@/components/sections/tracker").then((m) => m.Tracker));
const Hours = dynamic(() => import("@/components/sections/hours").then((m) => m.Hours));
const Gallery = dynamic(() => import("@/components/sections/gallery").then((m) => m.Gallery));

export default function Home() {
  return (
    <>
      <Hero />
      <Options />
      <Shop />
      <Services />
      <Process />
      <Tracker />
      <Hours />
      <Location />
      <Gallery />
    </>
  );
}
