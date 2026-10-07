import type { Metadata } from "next";

import { BrandGrid } from "@/components/brand-grid";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { brands } from "@/data/brands";
import { localizeProduct, products } from "@/data/products";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import { getLocale, type LangParams } from "@/lib/page-params";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/brands",
    title: t.seo.brandsTitle,
    description: t.seo.brandsDescription,
  });
}

export default async function BrandsPage({ params }: LangParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);

  const entries = brands.map((brand) => ({
    name: brand.name,
    logo: brand.logo,
    ownBackground: brand.ownBackground,
    lines: products
      .filter((p) => p.brand === brand.name)
      .map((p) => ({ slug: p.slug, name: localizeProduct(p, locale).name })),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.nav.home, path: "/" },
          { name: t.nav.brands, path: "/brands" },
        ])}
      />
      <PageHero
        locale={locale}
        title={t.brandsPage.title}
        crumbs={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: t.nav.brands }]}
      >
        {t.brandsPage.intro(brands.length)}
      </PageHero>
      <Section className="pt-10 sm:pt-12">
        <p className="mb-6 text-lg">
          {t.brandsPage.dontSee}{" "}
          <a
            href={whatsappUrl(t.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-whatsapp underline underline-offset-4 transition-colors duration-150 hover:text-whatsapp-hover"
          >
            {t.brandsPage.askUs}
          </a>
        </p>
        <BrandGrid brands={entries} locale={locale} />
      </Section>
    </>
  );
}
