import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryIcon } from "@/components/category-icon";
import { Section, SectionHeading } from "@/components/section";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export function Categories() {
  return (
    <Section id="categories">
      <SectionHeading eyebrow="Products" title="What we supply">
        Four product ranges for MEP contractors, HVAC installers and maintenance
        companies. Open a range to see every product and ask for a price.
      </SectionHeading>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const count = getProductsByCategory(c.slug).length;
          return (
            <li key={c.slug}>
              <Link
                href={`/products/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-grey/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-charcoal text-on-dark">
                  <CategoryIcon icon={c.icon} className="size-7" strokeWidth={1.75} />
                </span>
                <h3 className="font-display mt-5 text-xl font-bold">{c.name}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {c.summary}
                </p>
                <span className="mt-5 flex items-center justify-between text-sm font-semibold text-brand-grey">
                  <span>
                    {count} {count === 1 ? "product" : "products"}
                  </span>
                  <ArrowRight
                    className="size-5 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-brand rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
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
