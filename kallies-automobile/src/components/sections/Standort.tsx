import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { DirectionsButton } from "@/components/DirectionsButton";
import { mapsEmbedUrl, site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Mo=0 … So=6, matching site.hours order (Mo–Fr, Sa, So). */
const todayIndex = () => {
  const d = (new Date().getDay() + 6) % 7;
  return d <= 4 ? 0 : d === 5 ? 1 : 2;
};

/** The map loads only after a click, so no data goes to Google before the visitor chooses it (DSGVO). */
function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-line lg:aspect-auto lg:h-[420px]">
      {loaded ? (
        <iframe title="Karte: Kallies Automobile, Am Herrmannschacht 1, 06712 Zeitz" src={mapsEmbedUrl} className="absolute inset-0 size-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-ink text-brand">
            <MapPin className="size-6" aria-hidden />
          </span>
          <p className="font-display text-xl font-bold">
            {site.address.street}, {site.address.zip} {site.address.city}
          </p>
          <p className="max-w-xs text-sm text-grey">Mit dem Laden der Karte werden Daten an Google übertragen.</p>
          <Button onClick={() => setLoaded(true)}>Karte laden</Button>
        </div>
      )}
    </div>
  );
}

export function Standort() {
  const today = todayIndex();
  return (
    <section className="section" aria-labelledby="standort-title">
      <div className="container">
        <SectionHeading eyebrow="Standort" title={<span id="standort-title">Besuchen Sie uns in Zeitz</span>} lead="In weniger als einer halben Stunde aus Gera und Weißenfels erreichbar – aus dem Süden Leipzigs sind es etwa 50 Minuten." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal className="rounded-lg border border-line bg-white p-8">
            <address className="space-y-4 not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-brand-ink" aria-hidden />
                <span>
                  <strong className="font-display text-lg">{site.legalName} – Zeitz</strong>
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-brand-ink" aria-hidden />
                <a href={site.phoneHref} className="font-medium hover:text-brand-ink">{site.phone}</a>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-brand-ink" aria-hidden />
                <a href={`mailto:${site.email}`} className="font-medium hover:text-brand-ink">{site.email}</a>
              </p>
            </address>

            <div className="mt-8 border-t border-line pt-6">
              <h3 className="mb-4 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-grey">
                <Clock className="size-4" aria-hidden /> Öffnungszeiten
              </h3>
              <dl className="divide-y divide-line text-sm">
                {site.hours.map((h, i) => (
                  <div key={h.days} className={cn("flex justify-between gap-4 py-3", i === today && "font-semibold")}>
                    <dt>
                      {h.days}
                      {i === today && <span className="ml-2 rounded-sm bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-paper">Heute</span>}
                    </dt>
                    <dd className="tabular-nums">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DirectionsButton>Route planen</DirectionsButton>
              <Button asChild variant="outline">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden /> WhatsApp<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <MapEmbed />
            <DirectionsButton variant="outline" className="mt-4 w-full sm:w-auto">
              Route in Google Maps öffnen
            </DirectionsButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
