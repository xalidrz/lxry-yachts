import { MapPin, Phone } from "lucide-react";
import { hero, links, site } from "@/content";
import { Button } from "@/components/ui/button";
import { Mandala } from "@/components/Mandala";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-charcoal md:min-h-[640px]">
      <picture>
        <source
          type="image/webp"
          srcSet="/photos/studio-balance-640.webp 640w, /photos/studio-balance-1100.webp 1100w, /photos/studio-balance-1600.webp 1600w"
          sizes="100vw"
        />
        <img
          src="/photos/studio-balance-1100.webp"
          alt={hero.imageAlt}
          width={1600}
          height={1068}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      </picture>
      {/* Flat dark wash so the white text stays readable; no blur involved. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/80 via-charcoal/65 to-charcoal/40" />
      <Mandala className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-[420px] w-[420px] text-sage opacity-80 md:-bottom-32 md:-right-20 md:h-[620px] md:w-[620px]" />

      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/85">{site.name}</p>
        <h1 className="mt-5 max-w-3xl text-balance text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">{hero.title}</h1>
        <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">{hero.subtitle}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <a href={links.tel}>
              <Phone aria-hidden="true" strokeWidth={1.5} />
              {hero.callLabel}
            </a>
          </Button>
          <Button asChild size="lg" variant="light">
            <a href={links.directions} target="_blank" rel="noopener noreferrer">
              <MapPin aria-hidden="true" strokeWidth={1.5} />
              {hero.directionsLabel}
              <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
