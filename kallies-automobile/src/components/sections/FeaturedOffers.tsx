import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { InquiryDialog } from "@/components/vehicles/InquiryDialog";
import { useI18n } from "@/i18n";
import { ALL, pickFeatured } from "@/lib/inventory";
import type { Vehicle } from "@/data/vehicles";

/** "Angebote der Woche" — curated picks, back-filled from stock so the section is never empty (see pickFeatured). */
export function FeaturedOffers() {
  const { t } = useI18n();
  const [inquiry, setInquiry] = useState<Vehicle | null>(null);
  const offers = pickFeatured(4);

  return (
    <section className="section" aria-labelledby="angebote-title">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.featured.eyebrow} title={<span id="angebote-title">{t.featured.title}</span>} lead={t.featured.lead} />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/fahrzeuge">
              {t.featured.all(ALL.length)} <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((v, i) => (
            <li key={v.id}>
              <Reveal delay={i * 0.08} className="h-full">
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
