import { ArrowRight, Mouse, MapPin } from "lucide-react";
import { hero, links } from "@/content";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" data-tone="dark" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-espresso text-cream">
      <img
        src={hero.image}
        alt={hero.imageAlt}
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center] md:object-right"
      />
      <div aria-hidden="true" className="hero-overlay absolute inset-0 -z-10" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-10 pt-32 sm:px-8">
        <div className="max-w-3xl">
          <p className="flex animate-fade-up items-center gap-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {hero.eyebrow}
            <span aria-hidden="true" className="h-px w-14 bg-gold" />
          </p>
          <h1
            className="mt-6 animate-fade-up text-[clamp(3.25rem,8vw,6.75rem)] leading-[1.02] text-cream"
            style={{ animationDelay: "120ms" }}
          >
            {hero.titleLine1}
            <br />
            <em className="font-medium italic text-gold">{hero.titleLine2}</em>
          </h1>
          <p className="mt-8 max-w-[30rem] animate-fade-up text-lg leading-relaxed text-cream sm:text-xl" style={{ animationDelay: "240ms" }}>
            {hero.subtitle}
          </p>
          <div className="mt-10 flex animate-fade-up flex-col gap-4 sm:flex-row" style={{ animationDelay: "360ms" }}>
            <Button asChild size="lg">
              <a href={links.tel}>
                <ArrowRight aria-hidden="true" strokeWidth={1.5} />
                {hero.callLabel}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={links.directions} target="_blank" rel="noopener noreferrer">
                <MapPin aria-hidden="true" strokeWidth={1.5} />
                {hero.directionsLabel}
                <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 md:pb-10">
        <ul
          className="flex animate-fade-up flex-col gap-5 border-t border-gold/20 pt-6 lg:max-w-4xl lg:flex-row lg:items-center lg:gap-0 lg:divide-x lg:divide-gold/30 lg:border-t-0 lg:pt-0"
          style={{ animationDelay: "480ms" }}
        >
          {hero.trust.map(({ icon: Icon, lines }) => (
            <li key={lines[0]} className="flex items-center gap-4 lg:px-8 lg:first:pl-0">
              <Icon aria-hidden="true" strokeWidth={1.25} className="size-9 shrink-0 text-gold" />
              <span className="text-[0.95rem] leading-snug text-cream">
                {lines[0]} <br className="hidden lg:block" />
                {lines[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#apropos"
        className="absolute bottom-6 right-8 hidden flex-col items-center gap-3 text-cream transition-colors duration-500 hover:text-gold lg:flex"
      >
        <Mouse aria-hidden="true" strokeWidth={1.25} className="size-8 text-gold" />
        <span className="text-xs font-medium tracking-[0.3em]">{hero.scrollLabel}</span>
        <span aria-hidden="true" className="h-10 w-px bg-gold/60" />
      </a>
    </section>
  );
}
