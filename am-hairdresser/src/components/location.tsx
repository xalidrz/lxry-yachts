"use client";

import { Clock, Facebook, MapPin, MessageCircle, Navigation, Phone, Wifi, Baby, Hash } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/data/site";

export function Location() {
  const { t } = useLang();
  const row = "flex gap-4";
  const iconBox = "mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold-fill text-gold-light";
  const label = "text-xs uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:text-sm";

  return (
    <section id="location" className="section bg-ink-2">
      <div className="container">
        <SectionHeading eyebrow={t.location.eyebrow} title={t.location.title} />
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal className="order-2 lg:order-1">
            <div className="glass space-y-6 rounded-3xl p-6 md:p-8">
              <div className={row}>
                <span className={iconBox}><MapPin className="size-5" /></span>
                <div>
                  <p className={label}>{t.location.address}</p>
                  <p className="mt-1 text-cream">{t.location.addressValue}</p>
                </div>
              </div>
              <div className={row}>
                <span className={iconBox}><Hash className="size-5" /></span>
                <div>
                  <p className={label}>{t.location.plusCode}</p>
                  <p className="mt-1 text-cream" dir="ltr" style={{ unicodeBidi: "plaintext" }}>{site.plusCode}</p>
                </div>
              </div>
              <div className={row}>
                <span className={iconBox}><Phone className="size-5" /></span>
                <div>
                  <p className={label}>{t.location.phone}</p>
                  <a href={`tel:${site.phoneTel}`} className="mt-1 inline-block text-cream hover:text-gold-light" dir="ltr">{site.phoneDisplay}</a>
                </div>
              </div>
              <div className={row}>
                <span className={iconBox}><Clock className="size-5" /></span>
                <div>
                  <p className={label}>{t.location.hours}</p>
                  <p className="mt-1 text-cream">{t.location.hoursValue}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2 pt-1" aria-label={t.location.amenities}>
                <li className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm"><Wifi className="size-4 text-gold" />{t.location.wifi}</li>
                <li className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm"><Baby className="size-4 text-gold" />{t.location.kids}</li>
              </ul>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button asChild>
                  <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer"><Navigation />{t.location.directions}</a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={`tel:${site.phoneTel}`}><Phone />{t.location.call}</a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={whatsappLink(t.whatsappMessages.general)} target="_blank" rel="noopener noreferrer"><MessageCircle />{t.location.whatsapp}</a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer"><Facebook />{t.location.facebook}</a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="h-80 overflow-hidden rounded-3xl border border-white/10 shadow-nav sm:h-96 lg:h-full lg:min-h-[28rem]">
              <iframe
                title={t.location.mapTitle}
                src={site.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="size-full border-0 [filter:grayscale(.35)_contrast(1.05)_brightness(.85)]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
