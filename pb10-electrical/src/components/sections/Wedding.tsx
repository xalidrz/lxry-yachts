import { ArrowRight, CalendarHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { FairyLights } from "@/components/FairyLights";
import { GlowCard } from "@/components/GlowCard";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { wedding } from "@/data/services";
import { cn } from "@/lib/utils";

/** `bare` drops the heading (inner pages already have an h1); `more` adds a link to the full page. */
export function Wedding({ bare = false, more = false }: { bare?: boolean; more?: boolean }) {
  return (
    <section
      id="wedding"
      aria-labelledby={bare ? undefined : "wedding-title"}
      aria-label={bare ? "Wedding and event lighting services" : undefined}
      className={cn("relative overflow-hidden bg-surface-2", bare ? "pb-24 pt-4 md:pb-32" : "py-24 md:py-32")}
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,182,39,0.16),transparent_70%),linear-gradient(to_bottom,#121212,#222222_22%,#222222_78%,#121212)]" />
      <FairyLights count={90} />
      <div className="container relative">
        {!bare && (
        <SectionHeading
          eyebrow="Wedding lighting Edmonton"
          title={
            <span id="wedding-title">
              Turn your celebration into a <Accent>glowing memory</Accent>
            </span>
          }
          intro="Weddings, mehndi, sangeet, receptions and festivals — we design and install the lighting, then take it all down and clean up after."
        />
        )}

        <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-6", !bare && "mt-14")}>
          {wedding.map(({ title, blurb, icon: Icon, image, imagePosition }, i) => (
            <li key={title} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
              <Reveal delay={(i % 3) * 0.1} className="h-full">
                <GlowCard tone="warm" className="flex flex-col bg-ink/70 backdrop-blur-sm">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                      style={{ objectPosition: imagePosition }}
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,182,39,0.35),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute bottom-4 left-5 z-20 grid size-12 place-items-center rounded-lg border border-volt-light/50 bg-ink/80 text-volt-light backdrop-blur transition-shadow duration-500 group-hover:shadow-[0_0_26px_rgba(255,182,39,0.7)]">
                      <Icon className="size-6" strokeWidth={1.7} />
                    </span>
                  </div>
                  <div className="relative z-20 flex flex-1 flex-col p-6 pt-5">
                    <h3 className="text-[1.3rem]">{title}</h3>
                    <p className="mt-2.5 flex-1 text-[0.96rem] text-muted-foreground">{blurb}</p>
                  </div>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-white/10 bg-ink/60 px-6 py-8 text-center backdrop-blur-md sm:flex-row sm:text-left">
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-volt/50 bg-volt/10 text-volt-light">
              <CalendarHeart className="size-7" strokeWidth={1.6} />
            </span>
            <p className="flex-1 text-[1.02rem] text-white/85">Got a date in mind? Tell us the event date and we'll come to see the space for free and send a quote.</p>
            <Button asChild>
              <Link to="/contact?service=Wedding%20Lighting">
                Check my date <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>

        {more && (
          <Reveal className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/wedding-lighting">
                Explore wedding lighting <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
