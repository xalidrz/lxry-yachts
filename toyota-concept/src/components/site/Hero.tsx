import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero } from "@/data/content";
import { icons } from "./icons";

export function Hero() {
  const { image } = hero;
  return (
    <section
      aria-labelledby="hero-title"
      data-surface="dark"
      className="relative flex flex-col overflow-hidden bg-surface text-fg lg:min-h-[calc(100svh-var(--chrome-h))]"
    >
      {/* soft ground gradient (plain gradients, no blur) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 38% at 68% 74%, color-mix(in srgb, var(--steel) 34%, var(--graphite)) 0%, transparent 70%), linear-gradient(180deg, transparent 62%, var(--ink) 100%)",
        }}
      />
      <div className="grid-12 relative flex-1 pt-6 lg:pt-10">
        <div className="col-span-12 flex flex-col gap-3 lg:col-span-6">
          <p className="t-eyebrow text-muted">Concept redesign</p>
          <h1 id="hero-title" className="headline t-display">
            {hero.headline}
          </h1>
          <p className="t-lead text-muted">{hero.subline}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button asChild>
              <a href={hero.primary.href}>{hero.primary.label}</a>
            </Button>
            <Button asChild variant="outline">
              <a href={hero.secondary.href}>{hero.secondary.label}</a>
            </Button>
          </div>
        </div>

        <div className="col-span-12 mt-4 flex items-end lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[min(1040px,66%)]">
          <img
            src={`/images/${image.base}-${image.widths[1]}.webp`}
            srcSet={image.widths.map((w) => `/images/${image.base}-${w}.webp ${w}w`).join(", ")}
            sizes="(min-width: 1024px) 1000px, 100vw"
            width={image.width}
            height={image.height}
            alt={image.alt}
            decoding="sync"
            // eslint-disable-next-line react/no-unknown-property
            {...{ fetchpriority: "high" }}
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="relative">
        <div className="grid-12">
          <ul className="col-span-12 m-0 grid list-none grid-cols-1 gap-2 border-t border-line p-0 py-3 md:grid-cols-3 md:gap-3">
            {hero.facts.map((f) => {
              const Icon = icons[f.icon];
              return (
                <li key={f.text} className="t-small flex items-center gap-2">
                  <Icon className="size-[24px]" aria-hidden="true" />
                  <span>{f.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-center pb-3 max-lg:hidden">
          <a href={hero.scrollCue.href} aria-label={hero.scrollCue.aria} className="t-small flex flex-col items-center gap-0.5 rounded-pill px-2 text-muted hover:text-fg">
            {hero.scrollCue.label}
            <ChevronDown className="cue size-[20px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
