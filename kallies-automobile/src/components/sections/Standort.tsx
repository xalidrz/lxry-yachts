import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirectionsActions } from "@/components/DirectionsActions";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { mapsEmbedUrl, site } from "@/data/site";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/** Index into site.hours for today: Mo–Fr, Sa, So. */
const todayIndex = () => {
  const d = (new Date().getDay() + 6) % 7;
  return d <= 4 ? 0 : d === 5 ? 1 : 2;
};

/** The map loads only after a click, so no data goes to Google before the visitor chooses it (DSGVO). */
function MapEmbed() {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-line lg:aspect-auto lg:h-[420px]">
      {loaded ? (
        <iframe title={t.standort.mapTitle} src={mapsEmbedUrl} className="absolute inset-0 size-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-ink text-brand">
            <MapPin className="size-6" aria-hidden />
          </span>
          <p className="font-display text-xl font-bold" translate="no">
            {site.address.street}, {site.address.zip} {site.address.city}
          </p>
          <p className="max-w-xs text-sm text-grey">{t.standort.mapNote}</p>
          <Button onClick={() => setLoaded(true)}>{t.standort.loadMap}</Button>
        </div>
      )}
    </div>
  );
}

export function Standort() {
  const { t } = useI18n();
  const today = todayIndex();
  return (
    <section className="section overflow-x-clip" aria-labelledby="standort-title">
      <div className="container">
        <SectionHeading eyebrow={t.standort.eyebrow} title={<span id="standort-title">{t.standort.title}</span>} lead={t.standort.lead} />
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal className="rounded-lg border border-line bg-white p-8">
            <address className="space-y-4 not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-brand-ink" aria-hidden />
                <span translate="no">
                  <strong className="font-display text-lg">{t.standort.name}</strong>
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
                <Clock className="size-4" aria-hidden /> {t.standort.openingHours}
              </h3>
              <dl className="divide-y divide-line text-sm">
                {site.hours.map((h, i) => (
                  <div key={h.key} className={cn("flex justify-between gap-4 py-3", i === today && "font-semibold")}>
                    <dt>
                      {t.standort.days[h.key]}
                      {i === today && <span className="ml-2 rounded-sm bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-paper">{t.standort.today}</span>}
                    </dt>
                    <dd className="tabular-nums">{h.open ? t.standort.range(h.open, h.close) : t.standort.closed}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <DirectionsActions compact />
              <Button asChild variant="outline">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden /> {t.standort.whatsapp}
                  <span className="sr-only">{t.standort.newTab}</span>
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal x={32} delay={0.08}>
            <MapEmbed />
            <DirectionsActions variant="outline" label={t.directions.openInMaps} className="mt-4" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
