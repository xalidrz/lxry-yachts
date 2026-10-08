import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GlowCard } from "@/components/GlowCard";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { electrical } from "@/data/services";
import { cn } from "@/lib/utils";

/** `bare` drops the heading (inner pages already have an h1); `more` adds a link to the full page. */
export function Electrical({ bare = false, more = false }: { bare?: boolean; more?: boolean }) {
  return (
    <section
      id="electrical"
      aria-labelledby={bare ? undefined : "electrical-title"}
      aria-label={bare ? "Electrical services" : undefined}
      className={cn("relative overflow-hidden bg-surface", bare ? "pb-24 pt-4 md:pb-32" : "py-24 md:py-32")}
    >
      <div aria-hidden className="bg-circuit absolute inset-0" />
      <div aria-hidden className="absolute -left-40 top-0 size-[520px] rounded-full bg-volt/10 blur-[120px]" />
      <div className="container relative">
        {!bare && (
          <SectionHeading
            eyebrow="Electrician in Edmonton"
            title={
              <span id="electrical-title">
                Electrical work, <Accent>done right</Accent>
              </span>
            }
            intro="From a single faulty outlet to a full rewire — clear quotes, tidy work and a job that's finished when we said it would be."
          />
        )}

        <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", !bare && "mt-14")}>
          {electrical.map(({ title, blurb, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <GlowCard className="p-7">
                  <div className="relative z-20 flex h-full flex-col">
                    <span className="grid size-14 place-items-center rounded-lg border border-volt/40 bg-volt/10 text-volt-light transition-all duration-500 group-hover:border-volt group-hover:bg-volt group-hover:text-ink group-hover:shadow-[0_0_28px_rgba(247,147,30,0.65)]">
                      <Icon className="size-7" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-6 text-[1.35rem]">{title}</h3>
                    <p className="mt-3 flex-1 text-[0.97rem] text-muted-foreground">{blurb}</p>
                    <Link to="/contact?service=Electrical" className="label mt-6 inline-flex items-center gap-2 text-[0.88rem] text-volt-light transition-all hover:gap-3.5">
                      Get a quote <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ul>

        {more && (
          <Reveal className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/electrical">
                All electrical services <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
