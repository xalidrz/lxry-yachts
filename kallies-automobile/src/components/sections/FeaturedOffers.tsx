import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { InquiryDialog } from "@/components/vehicles/InquiryDialog";
import { ALL, pickFeatured } from "@/lib/inventory";
import type { Vehicle } from "@/data/vehicles";

/** "Angebote der Woche" — curated picks, back-filled from stock so the section is never empty (see pickFeatured). */
export function FeaturedOffers() {
  const [inquiry, setInquiry] = useState<Vehicle | null>(null);
  const offers = pickFeatured(4);

  return (
    <section className="section" aria-labelledby="angebote-title">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Handverlesen"
            title={<span id="angebote-title">Angebote der Woche</span>}
            lead="Jede Woche eine neue Auswahl aus unserem Autohaus in Zeitz."
          />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/fahrzeuge">
              Alle {ALL.length} Fahrzeuge <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((v, i) => (
            <li key={v.id}>
              <Reveal delay={i * 90} className="h-full">
                <VehicleCard vehicle={v} onInquire={setInquiry} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <InquiryDialog vehicle={inquiry} onClose={() => setInquiry(null)} />
    </section>
  );
}
