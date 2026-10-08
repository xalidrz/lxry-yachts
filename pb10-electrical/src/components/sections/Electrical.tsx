import { ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { electrical } from "@/data/services";

export function Electrical() {
  return (
    <section id="electrical" aria-labelledby="electrical-title" className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div aria-hidden className="bg-circuit absolute inset-0" />
      <div aria-hidden className="absolute -left-40 top-0 size-[520px] rounded-full bg-volt/10 blur-[120px]" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Electrician in Edmonton"
          title={
            <span id="electrical-title">
              Electrical work, <Accent>done right</Accent>
            </span>
          }
          intro="From a single faulty outlet to a full rewire — clear quotes, tidy work and a job that's finished when we said it would be."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                    <a href="#contact" className="label mt-6 inline-flex items-center gap-2 text-[0.88rem] text-volt-light transition-all hover:gap-3.5">
                      Get a quote <ArrowRight className="size-4" />
                    </a>
                  </div>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
