import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { reasonIcons } from "@/data/content";
import { useI18n } from "@/i18n";

export function WhyKallies() {
  const { t } = useI18n();
  return (
    <section className="section" aria-labelledby="warum-title">
      <div className="container">
        <SectionHeading eyebrow={t.why.eyebrow} title={<span id="warum-title">{t.why.title}</span>} />
        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {t.why.reasons.map((r, i) => {
            const Icon = reasonIcons[i];
            return (
              <li key={r.title}>
                <Reveal delay={i * 0.08} className="h-full border-t border-ink pt-8">
                  <div className="flex items-center justify-between">
                    <Icon className="size-8 text-brand-ink" strokeWidth={1.5} aria-hidden />
                    <span className="font-display text-sm font-semibold tabular-nums text-grey">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold">{r.title}</h3>
                  <p className="mt-3 leading-relaxed text-grey">{r.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
