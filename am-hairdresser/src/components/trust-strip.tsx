"use client";

import { Baby, Clock, Star, Wifi } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

export function TrustStrip() {
  const { t } = useLang();
  const cell = "flex flex-col items-center gap-1.5 px-3 py-6 text-center md:py-8";
  const icon = "size-6 text-gold";
  return (
    <section id="trust" aria-label="Highlights" className="relative z-10 -mt-6 px-4">
      <Reveal className="mx-auto max-w-5xl">
        <div className="glass grid grid-cols-2 divide-white/10 overflow-hidden rounded-3xl md:grid-cols-4 md:divide-x rtl:md:divide-x-reverse [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(-n+2)]:border-white/10 md:[&>*]:border-b-0">
          <div className={cell}>
            <div className="font-display flex items-center gap-1.5 text-4xl font-semibold text-cream md:text-5xl" dir="ltr">
              <CountUp value={site.rating} decimals={1} />
              <Star className="size-6 fill-gold text-gold md:size-7" aria-label="★" />
            </div>
            <p className="text-xs text-cream/65 md:text-sm">
              {t.trust.from} <span className="font-medium text-cream"><CountUp value={site.reviewCount} /></span> {t.trust.ratingLabel}
            </p>
          </div>
          <div className={cell}>
            <Wifi className={icon} />
            <p className="text-sm font-medium text-cream md:text-base">{t.trust.wifi}</p>
          </div>
          <div className={cell}>
            <Baby className={icon} />
            <p className="text-sm font-medium text-cream md:text-base">{t.trust.kids}</p>
          </div>
          <div className={cell}>
            <Clock className={icon} />
            <p className="text-sm font-medium text-cream md:text-base">{t.trust.late}</p>
            <p className="text-xs text-cream/60">{t.trust.lateSub}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
