import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickSearch } from "@/components/sections/QuickSearch";
import { site } from "@/data/site";

const trust = [
  { value: `${site.rating.value}/${site.rating.outOf}`, label: "Sterne", stars: true },
  { value: String(site.rating.count), label: "Bewertungen" },
  { value: site.customers, label: "Kunden" },
  { value: `seit ${site.since}`, label: "Erfahrung" },
];

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white" aria-labelledby="hero-title">
      <img
        src="/images/hero.webp"
        alt=""
        width={1000}
        height={400}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[68%_center]"
      />
      {/* Solid gradients only — no blur or filters. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/25 md:via-ink/70" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent" aria-hidden />

      <div className="container flex flex-col justify-center pb-10 pt-16 md:pb-14 md:pt-24">
        <p className="eyebrow">Autohaus Zeitz · seit {site.since}</p>
        <h1 id="hero-title" className="display-1 mt-5 max-w-4xl">
          <span className="block">Das richtige Auto.</span>
          <span className="block">Mit Erfahrung seit {site.since}.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
          Das freie Autohaus für junge Gebrauchte, Neufahrzeuge und Oldtimer – inhabergeführt, ehrlich beraten und fair bepreist.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="lg">
            <Link to="/fahrzeuge">
              Fahrzeuge ansehen <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <Link to="/ankauf">Auto verkaufen</Link>
          </Button>
        </div>
        <div className="mt-12 md:mt-16">
          <QuickSearch />
        </div>
      </div>

      <div className="border-t border-white/15 bg-ink">
        <div className="container">
          <ul className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4" aria-label="Warum Kunden uns vertrauen">
            {trust.map((t) => (
              <li key={t.label} className="flex flex-wrap items-baseline gap-x-2 bg-ink px-4 py-5 md:justify-center">
                {t.stars && <Star className="size-4 translate-y-0.5 fill-brand text-brand" aria-hidden />}
                <span className="whitespace-nowrap font-display text-xl font-bold md:text-2xl">{t.value}</span>
                <span className="text-sm text-white/75">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
