import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StickyCall } from "@/components/StickyCall";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Gallery } from "@/sections/Gallery";
import { Offers } from "@/sections/Offers";
import { Reviews } from "@/sections/Reviews";

export default function App() {
  return (
    <>
      <a
        href="#apropos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-2 focus:text-cream"
      >
        Aller au contenu
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Offers />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <StickyCall />
    </>
  );
}
