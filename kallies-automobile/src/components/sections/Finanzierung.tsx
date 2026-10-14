import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/i18n";

export function Finanzierung() {
  const { t } = useI18n();
  return (
    <section className="section bg-white" aria-labelledby="finanzierung-title">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="overflow-hidden rounded-lg border border-line">
          <img src="/images/standort.webp" alt={t.finance.imgAlt} width={700} height={368} loading="lazy" className="aspect-[4/3] size-full object-cover" />
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading eyebrow={t.finance.eyebrow} title={<span id="finanzierung-title">{t.finance.title}</span>} lead={t.finance.lead} />
          <ul className="mt-8 space-y-4">
            {t.finance.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-brand-ink" strokeWidth={2.5} aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 inline-flex items-center gap-3 border border-line px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-grey">{t.finance.partner}</span>
            <span className="font-display text-lg font-bold tracking-tight" translate="no">Santander</span>
          </div>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link to="/kontakt?betreff=Finanzierung">{t.finance.cta}</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-grey">{t.finance.small}</p>
        </Reveal>
      </div>
    </section>
  );
}
