import type { Metadata } from "next";
import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { brands } from "@/data/brands";
import { localizeProduct, products } from "@/data/products";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import { getLocale, type LangParams } from "@/lib/page-params";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

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
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => {
            const items = products.filter((p) => p.brand === brand.name);
            return (
              <li key={brand.name} className="flex flex-col rounded-2xl border bg-card p-6">
                <div className="flex items-center gap-4">
                  <BrandLogo
                    brand={brand}
                    locale={locale}
                    sizes="64px"
                    className="size-16 shrink-0 p-1"
                  />
                  <h2 dir="ltr" className="font-display text-xl font-bold">
                    {brand.name}
                  </h2>
                </div>
                {items.length > 0 ? (
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={localePath(locale, `/products/${p.slug}`)}
                          className="text-[0.9375rem] underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
                        >
                          {localizeProduct(p, locale).name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 flex-1 text-[0.9375rem] text-muted-foreground">
                    {t.brandsPage.askWhich(brand.name)}
                  </p>
                )}
                <WhatsAppButton
                  message={t.wa.brand(brand.name)}
                  size="sm"
                  variant="outline"
                  className="mt-6 self-start"
                  ariaLabel={t.brandsPage.askAboutAria(brand.name)}
                >
                  {t.brandsPage.askAbout(brand.name)}
                </WhatsAppButton>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
