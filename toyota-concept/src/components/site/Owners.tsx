import { ArrowUpRight } from "lucide-react";
import { owners } from "@/data/content";
import { icons } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function Owners() {
  return (
    <section id={owners.id} aria-labelledby="owners-title" className="section" data-surface="paper">
      <div className="grid-12 gap-y-4">
        <Reveal className="col-span-12">
          <SectionHead id="owners-title" eyebrow={owners.eyebrow} title={owners.title} />
        </Reveal>
        <Reveal as="ul" className="col-span-12 m-0 grid list-none grid-cols-2 gap-2 p-0 md:gap-3 lg:grid-cols-4">
          {owners.items.map((o) => {
            const Icon = icons[o.icon];
            return (
              <li key={o.id}>
                <a
                  href={o.href}
                  className="lift group flex h-full min-h-[200px] flex-col gap-2 rounded-card border border-line bg-white p-3 text-ink hover:border-ink md:p-4"
                >
                  <span className="flex items-start justify-between">
                    <Icon className="size-[32px]" aria-hidden="true" />
                    <ArrowUpRight className="size-[20px]" aria-hidden="true" />
                  </span>
                  <span className="mt-auto">
                    <span className="headline t-h3 block">{o.title}</span>
                    <span className="t-small block text-muted">{o.line}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
