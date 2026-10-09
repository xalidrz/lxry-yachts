import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Location } from "@/components/location";
import { Navbar } from "@/components/navbar";
import { Reviews } from "@/components/reviews";
import { Services } from "@/components/services";
import { TrustStrip } from "@/components/trust-strip";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Gallery />
        <HowItWorks />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
