import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ProductBrowser } from "@/components/product-browser";
import { Section } from "@/components/section";
import { categories, localizeCategory } from "@/data/categories";
import { localizeProduct, productSearchText, products } from "@/data/products";
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
    const text = localizeProduct(p, locale);
    return {
      slug: p.slug,
      name: text.name,
      brand: p.brand,
      category: p.category,
      shortDescription: text.shortDescription,
      image: p.image,
      searchText: productSearchText(p, locale),
    };
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
        <ProductBrowser
          locale={locale}
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
