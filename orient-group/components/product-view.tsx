import { Phone } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { localizeCategory, type Category } from "@/data/categories";
import { getRelatedProducts, localizeProduct, type Product } from "@/data/products";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { OFFICE_PHONE } from "@/lib/site";
import { ANY_BRAND, productLabel } from "@/lib/whatsapp";

export function ProductView({
  product,
  category,
  locale,
}: {
  product: Product;
  category: Category;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const p = localizeProduct(product, locale);
  const cat = localizeCategory(category, locale);
  const related = getRelatedProducts(product);
  const brandLabel = product.brand === ANY_BRAND ? t.common.variousBrands : product.brand;
  const label = productLabel(p.name, product.brand);

  return (
    <>
      <JsonLd data={productJsonLd(product, category, locale)} />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.nav.home, path: "/" },
          { name: t.nav.products, path: "/products" },
          { name: cat.name, path: `/products/${category.slug}` },
          { name: p.name, path: `/products/${product.slug}` },
        ])}
      />

      <div className="on-dark bg-charcoal pt-6 pb-6">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: t.nav.home, href: localePath(locale, "/") },
              { label: t.nav.products, href: localePath(locale, "/products") },
              { label: cat.name, href: localePath(locale, `/products/${category.slug}`) },
              { label: p.name },
            ]}
          />
        </div>
      </div>

      <Section className="py-10 sm:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery
            product={product}
            name={p.name}
            photos={product.image ? [product.image, ...(product.moreImages ?? [])] : []}
            locale={locale}
          />
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="muted">{cat.title}</Badge>
              {product.brand !== ANY_BRAND && <Badge>{product.brand}</Badge>}
            </div>
            <h1 className="font-display mt-4 text-3xl leading-tight font-extrabold text-balance sm:text-4xl">
              {p.name}
            </h1>
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-[0.9375rem]">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">{t.product.brand}</dt>
                <dd className="font-semibold">{brandLabel}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">{t.product.category}</dt>
                <dd className="font-semibold">{cat.name}</dd>
              </div>
            </dl>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {p.shortDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={t.wa.price(label)} size="lg">
                {t.common.askForPrice}
              </WhatsAppButton>
              <Button asChild variant="secondary" size="lg">
                <a
                  href={`tel:${OFFICE_PHONE.tel}`}
                  aria-label={t.common.callOrient(OFFICE_PHONE.display)}
                >
                  <Phone aria-hidden="true" />
                  {t.common.call}
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{t.product.pricesNote}</p>
          </div>
        </div>
      </Section>

      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-extrabold">{t.product.description}</h2>
            <p className="mt-4 text-lg leading-relaxed">{p.description}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold">{t.product.specifications}</h2>
            {p.specs.length > 0 ? (
              <table className="mt-4 w-full border-collapse text-[0.9375rem]">
                <tbody>
                  {p.specs.map((spec) => (
                    <tr key={spec.label} className="border-b align-top">
                      <th
                        scope="row"
                        className="w-2/5 py-3 pe-4 text-start font-semibold text-muted-foreground"
                      >
                        {spec.label}
                      </th>
                      <td className="py-3">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <p className="mt-4 text-lg leading-relaxed">
                  {p.specsPrompt ?? t.product.defaultSpecsPrompt}
                </p>
                <WhatsAppButton
                  className="mt-5"
                  variant="outline"
                  message={t.wa.specs(label)}
                >
                  {t.common.askOnWhatsApp}
                </WhatsAppButton>
              </>
            )}
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="py-12 sm:py-16">
          <h2 className="font-display mb-8 text-2xl font-extrabold">{t.product.related}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ProductCard
                  product={{ ...r, ...localizeProduct(r, locale) }}
                  locale={locale}
                  headingLevel="h3"
                />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
