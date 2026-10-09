"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";
import { whatsappLink } from "@/data/site";

export function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="section bg-ink-2">
      <div className="container">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.sub} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map(({ id, icon: Icon, price }, i) => {
            const name = t.services.items[id];
            return (
              <li key={id}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <a
                    href={whatsappLink(t.whatsappMessages.service + name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.services.book}: ${name}`}
                    className="group block h-full rounded-3xl"
                  >
                    <Card className="flex h-full flex-col gap-6 p-6 md:p-7">
                      <div className="flex items-start justify-between">
                        <span className="grid size-14 place-items-center rounded-2xl border border-gold/30 bg-gold-fill text-gold-light transition-shadow duration-300 group-hover:shadow-gold-glow">
                          <Icon className="size-7" strokeWidth={1.5} />
                        </span>
                        <ArrowUpRight className="size-5 text-cream/30 transition-colors group-hover:text-gold rtl:-scale-x-100" />
                      </div>
                      <div className="mt-auto">
                        <h3 className="font-display text-2xl font-semibold text-cream">{name}</h3>
                        <p className="mt-2 text-sm text-gold">
                          {t.services.currency} {price || "—"}
                        </p>
                      </div>
                    </Card>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
