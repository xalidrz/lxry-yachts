"use client";

import { ChevronDown, MapPin, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { LiveBadge } from "@/components/live-badge";
import { useLang } from "@/components/lang-provider";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/data/site";

const GoldParticles = dynamic(() => import("@/components/gold-particles"), { ssr: false });

const rise = (delay: number) => ({ animationDelay: `${delay}ms` });

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-16 pt-28 text-center">
      {/* light streaks + glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(168,128,47,0.22),transparent_70%),linear-gradient(180deg,#0B0B0B,#141414_60%,#0B0B0B)]" />
        <div className="gold-streak animate-streak absolute -top-10 left-[8%] h-[120%] w-24 md:w-32" />
        <div className="gold-streak animate-streak absolute -top-10 left-[42%] h-[120%] w-14 [animation-delay:-5s] md:w-20" />
        <div className="gold-streak animate-streak absolute -top-10 left-[74%] h-[120%] w-28 [animation-delay:-9s] md:w-36" />
        <GoldParticles />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="animate-fade-up relative size-40 sm:size-48 md:size-56" style={rise(0)}>
          <div aria-hidden className="gold-ring animate-spin-slow absolute -inset-3 rounded-full" />
          <div aria-hidden className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(201,162,74,0.28)]" />
          <Logo size={224} priority className="relative size-full rounded-full" />
        </div>

        <p className="eyebrow animate-fade-up mt-8" style={rise(120)}>
          {t.hero.eyebrow}
        </p>

        <h1 className="font-display animate-fade-up mt-4 text-balance text-[2.6rem] font-semibold leading-[1.08] text-cream sm:text-6xl md:text-7xl" style={rise(220)}>
          {t.hero.line1}
          <span className="text-gold-gradient mt-1 block">{t.hero.line2}</span>
        </h1>

        <div className="animate-fade-up mt-8" style={rise(340)}>
          <LiveBadge />
        </div>

        <div className="animate-fade-up mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center" style={rise(440)}>
          <Button asChild size="lg">
            <a href={whatsappLink(t.whatsappMessages.general)} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              {t.hero.book}
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin />
              {t.hero.directions}
            </a>
          </Button>
        </div>
      </div>

      <a href="#trust" aria-label={t.hero.scroll} className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-gold/70 transition-colors hover:text-gold-light sm:block">
        <ChevronDown className="size-6 animate-bounce [animation-duration:2.4s]" />
      </a>
    </section>
  );
}
