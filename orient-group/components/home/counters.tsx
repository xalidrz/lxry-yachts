import { CountUp } from "@/components/count-up";
import { Section } from "@/components/section";
import { brands } from "@/data/brands";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { GAS_TYPE_COUNT, STATS } from "@/lib/site";

/**
 * Four figures that count up on scroll. Years and product count are
 * placeholders in lib/site.ts (STATS) until the client confirms them.
 */
export function Counters({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items = [
    { value: STATS.years, label: t.counters.years },
    { value: STATS.products, label: t.counters.products },
    { value: String(brands.length), label: t.counters.brands },
    { value: String(GAS_TYPE_COUNT), label: t.counters.gases },
  ];

  return (
    <Section tone="dark" className="py-12 sm:py-14" aria-label={t.counters.aria}>
      <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse text-center">
            <dd>
              <CountUp
                value={item.value}
                className="font-display block text-4xl leading-none font-extrabold sm:text-5xl"
              />
            </dd>
            <dt className="mt-3 text-sm font-semibold tracking-[0.1em] text-on-dark-muted uppercase">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}
