import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ProductExplorer } from "@/components/product-browser";
import { Section } from "@/components/section";
import { categories, localizeCategory } from "@/data/categories";
import { productCardData, productSearchText, products } from "@/data/products";
import { getGroupSlugs, shopGroups } from "@/data/shop-groups";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import { getLocale, type LangParams } from "@/lib/page-params";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/products",
    title: t.seo.productsTitle,
    description: t.seo.productsDescription,
  });
}

export default async function ProductsPage({ params }: LangParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);

  const browserProducts = products.map((p) => {
    return { ...productCardData(p, locale), searchText: productSearchText(p, locale) };
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.nav.home, path: "/" },
          { name: t.nav.products, path: "/products" },
        ])}
      />
      <PageHero
        locale={locale}
        title={t.products.title}
        crumbs={[
          { label: t.nav.home, href: localePath(locale, "/") },
          { label: t.nav.products },
        ]}
      >
        {t.products.intro}
      </PageHero>
      <Section className="pt-10 sm:pt-12">
        <ProductExplorer
          locale={locale}
          groups={{
            slugs: Object.fromEntries(shopGroups.map((g) => [g.key, getGroupSlugs(g.key)])),
            labels: t.shop.groups,
          }}
          products={browserProducts}
          categories={categories.map((c) => ({
            slug: c.slug,
            title: localizeCategory(c, locale).title,
          }))}
        />
      </Section>
    </>
  );
}
