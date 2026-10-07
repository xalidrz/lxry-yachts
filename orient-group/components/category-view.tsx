import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { categories, localizeCategory, type Category } from "@/data/categories";
import { getProductsByCategory, productCardData } from "@/data/products";
import { getDictionary } from "@/lib/dictionaries";
import { categoryPath, localePath, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function CategoryView({ category, locale }: { category: Category; locale: Locale }) {
  const t = getDictionary(locale);
  const cat = localizeCategory(category, locale);
  const items = getProductsByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.nav.home, path: "/" },
          { name: t.nav.products, path: "/products" },
          { name: cat.name, path: categoryPath(category.slug) },
        ])}
      />
      <PageHero
        locale={locale}
        title={cat.name}
        crumbs={[
          { label: t.nav.home, href: localePath(locale, "/") },
          { label: t.nav.products, href: localePath(locale, "/products") },
          { label: cat.name },
        ]}
      >
        {cat.intro}
      </PageHero>
      <Section className="pt-10 sm:pt-12">
        <nav aria-label={t.products.categoriesAria} className="mb-8">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href={localePath(locale, "/products")}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:border-brand-grey"
              >
                {t.products.all}
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={localePath(locale, categoryPath(c.slug))}
                  aria-current={c.slug === category.slug ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border px-5 text-[0.9375rem] font-semibold transition-colors duration-150",
                    c.slug === category.slug
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-white hover:border-brand-grey",
                  )}
                >
                  {localizeCategory(c, locale).title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <li key={p.slug}>
              <ProductCard
                product={productCardData(p, locale)}
                locale={locale}
                priority={i < 4}
              />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-lg">{t.products.categoryCta}</p>
          <WhatsAppButton message={t.wa.general}>{t.common.askUsOnWhatsApp}</WhatsAppButton>
        </div>
      </Section>
    </>
  );
}
