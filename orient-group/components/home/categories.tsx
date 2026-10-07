import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryIcon } from "@/components/category-icon";
import { Section, SectionHeading } from "@/components/section";
import { categories, localizeCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

export function Categories({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section id="categories">
      <SectionHeading eyebrow={t.home.categoriesEyebrow} title={t.home.categoriesTitle}>
        {t.home.categoriesText}
      </SectionHeading>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const count = getProductsByCategory(c.slug).length;
          const cat = localizeCategory(c, locale);
          return (
            <li key={c.slug}>
              <Link
                href={localePath(locale, `/products/${c.slug}`)}
                className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-grey/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-charcoal text-on-dark">
                  <CategoryIcon icon={c.icon} className="size-7" strokeWidth={1.75} />
                </span>
                <h3 className="font-display mt-5 text-xl font-bold">{cat.name}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {cat.summary}
                </p>
                <span className="mt-5 flex items-center justify-between text-sm font-semibold text-brand-grey">
                  <span>{t.common.product(count)}</span>
                  <ArrowRight
                    className="size-5 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-brand rtl:-scale-x-100 rtl:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
