import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
