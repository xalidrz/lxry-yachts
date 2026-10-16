import { ArrowRight } from "lucide-react";
import { offers } from "@/data/content";
import { icons } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function Offers() {
  return (
    <section id={offers.id} aria-labelledby="offers-title" className="section" data-surface="paper">
      <div className="grid-12 gap-y-4">
        <Reveal className="col-span-12">
          <SectionHead id="offers-title" eyebrow={offers.eyebrow} title={offers.title} />
        </Reveal>
        {offers.items.map((o) => {
          const Icon = icons[o.icon];
          return (
            <Reveal key={o.id} as="article" className="col-span-12 md:col-span-4">
              <div className="lift flex h-full flex-col gap-2 rounded-card border border-line bg-white p-4 text-ink hover:border-ink">
                <span className="inline-flex size-6 items-center justify-center rounded-card border border-line">
                  <Icon className="size-[24px]" aria-hidden="true" />
                </span>
                <h3 className="headline t-h3">{o.title}</h3>
                <p className="t-body text-muted">{o.line}</p>
                <div className="mt-auto flex flex-col gap-1 pt-2">
                  <a href={o.href} className="inline-flex w-fit items-center gap-0.5 font-medium underline decoration-1 underline-offset-[6px] hover:decoration-2">
                    {o.link}
                    <ArrowRight className="size-[16px]" aria-hidden="true" />
                  </a>
                  <p className="t-small text-muted">{offers.terms}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
