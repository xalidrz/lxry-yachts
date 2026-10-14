import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/lib/motion";
import { ALL, allMakes } from "@/lib/inventory";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function MarkenPage() {
  const { t } = useI18n();
  const p = t.pages.brands;
  usePageMeta(t.meta.brands.title, t.meta.brands.desc);
  const makes = allMakes().map((m) => [m, ALL.filter((v) => v.make === m).length] as const).sort((a, b) => b[1] - a[1]);
  return (
    <>
      <PageHeader image="/images/marken-bg.webp" eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <section className="section">
        <ul className="container grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {makes.map(([make, n], i) => (
            <li key={make} className="bg-white">
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <Link to={`/fahrzeuge?marke=${encodeURIComponent(make)}`} className="group flex h-full items-center justify-between p-8 transition-colors hover:bg-paper">
                  <span>
                    <span className="block font-display text-2xl font-bold uppercase tracking-[0.08em]" translate="no">{make}</span>
                    <span className="mt-1 block text-sm text-grey">{p.count(n)}</span>
                  </span>
                  <ArrowUpRight className="size-6 text-grey transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-ink" aria-hidden />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
