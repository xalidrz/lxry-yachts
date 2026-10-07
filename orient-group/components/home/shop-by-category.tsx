import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { categories, localizeCategory } from "@/data/categories";
import { getGroupCount, shopGroups } from "@/data/shop-groups";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

/** Large photo tiles. Each links to the products page filtered to that range. */
export function ShopByCategory({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Section tone="white" id="shop-by-category">
      <SectionHeading eyebrow={t.shop.eyebrow} title={t.shop.title}>
        {t.shop.text}
      </SectionHeading>

      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {shopGroups.map((group) => {
          const name = t.shop.groups[group.key];
          const count = getGroupCount(group, locale);
          const href = group.href
            ? localePath(locale, group.href)
            : `${localePath(locale, "/products")}?group=${group.key}`;
          return (
            <li key={group.key}>
              <Link
                href={href}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border bg-charcoal"
              >
                {group.image ? (
                  <Image
                    src={group.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,#1F1F1F,#3a3a3a)] text-white/25 transition-transform duration-500 ease-out group-hover:scale-105">
                    <Tag className="size-24" strokeWidth={1.25} aria-hidden="true" />
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                  <span>
                    <span className="font-display block text-xl leading-tight font-bold">{name}</span>
                    <span className="mt-1 block text-sm text-white/80">
                      {group.match ? t.shop.products(count) : t.shop.services(count)}
                    </span>
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-[0.9375rem] text-muted-foreground">
        {t.shop.ranges}{" "}
        {categories.map((c, i) => (
          <span key={c.slug}>
            {i > 0 && <span aria-hidden="true"> · </span>}
            <Link
              href={localePath(locale, `/products/${c.slug}`)}
              className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
            >
              {localizeCategory(c, locale).name}
            </Link>
          </span>
        ))}
      </p>
    </Section>
  );
}
