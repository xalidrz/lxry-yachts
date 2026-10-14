import { BadgeEuro, FileCheck2, Gauge } from "lucide-react";
import { AnkaufPanel } from "@/components/sections/AnkaufPanel";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/lib/motion";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

const icons = [Gauge, BadgeEuro, FileCheck2];

export default function AnkaufPage() {
  const { t } = useI18n();
  const p = t.ankauf.page;
  usePageMeta(t.meta.ankauf.title, t.meta.ankauf.desc);
  return (
    <>
      <PageHeader image="/images/ankauf-bg.webp" eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <AnkaufPanel />
      <section className="section bg-white">
        <div className="container">
          <h2 className="display-2 max-w-2xl">{p.perksTitle}</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {p.perks.map((perk, i) => {
              const Icon = icons[i];
              return (
                <li key={perk.title}>
                  <Reveal delay={i * 0.08} className="h-full border-t border-ink pt-8">
                    <Icon className="size-8 text-brand-ink" strokeWidth={1.5} aria-hidden />
                    <h3 className="mt-6 font-display text-xl font-bold">{perk.title}</h3>
                    <p className="mt-3 text-grey">{perk.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Faq />
    </>
  );
}
