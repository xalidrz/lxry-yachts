import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { CallButton } from "@/components/CallButton";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Electrical } from "@/components/sections/Electrical";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Wedding } from "@/components/sections/Wedding";
import { WhyChoose } from "@/components/sections/WhyChoose";

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a href="#electrical" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-volt focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Navbar />
        <main>
          <Hero />
          <Electrical />
          <Wedding />
          <Gallery />
          <HowItWorks />
          <Reviews />
          <WhyChoose />
          <Contact />
        </main>
        <Footer />
        <CallButton />
      </MotionConfig>
    </LazyMotion>
  );
}
