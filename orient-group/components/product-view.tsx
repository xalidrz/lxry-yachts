import { Phone } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { CategoryBadgeIcon } from "@/components/category-badge-icon";
import { ProductImage } from "@/components/product-image";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Category } from "@/data/categories";
import {
  DEFAULT_SPECS_PROMPT,
  getRelatedProducts,
  type Product,
} from "@/data/products";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { OFFICE_PHONE } from "@/lib/site";
import { ANY_BRAND, priceMessage, specsMessage } from "@/lib/whatsapp";

export function ProductView({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) {
  const related = getRelatedProducts(product);

  return (
    <>
      <JsonLd data={productJsonLd(product, category)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: category.name, path: `/products/${category.slug}` },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />

      <div className="on-dark bg-charcoal pt-28 pb-6 sm:pt-32">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: category.name, href: `/products/${category.slug}` },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <Section className="py-10 sm:py-14">
        <div
          className={
            product.image
              ? "grid items-start gap-8 lg:grid-cols-2 lg:gap-12"
              : "max-w-3xl"
          }
        >
          {product.image && (
            <ProductImage
              product={product}
              sizes="(min-width: 1024px) 560px, 100vw"
              priority
              className="rounded-2xl border"
            />
          )}
          <div>
            {!product.image && (
              <div className="mb-5">
                <CategoryBadgeIcon category={product.category} size="lg" />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge variant="muted">{category.title}</Badge>
              {product.brand !== ANY_BRAND && <Badge>{product.brand}</Badge>}
            </div>
            <h1 className="font-display mt-4 text-3xl leading-tight font-extrabold text-balance sm:text-4xl">
              {product.name}
            </h1>
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-[0.9375rem]">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Brand</dt>
                <dd className="font-semibold">{product.brand}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-semibold">{category.name}</dd>
              </div>
            </dl>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                message={priceMessage(product.name, product.brand)}
                size="lg"
              >
                Ask for price
              </WhatsAppButton>
              <Button asChild variant="secondary" size="lg">
                <a
                  href={`tel:${OFFICE_PHONE.tel}`}
                  aria-label={`Call Orient Group on ${OFFICE_PHONE.display}`}
                >
                  <Phone aria-hidden="true" />
                  Call
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Prices are not listed online. Ask on WhatsApp and we reply with the
              price and delivery time.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Description</h2>
            <p className="mt-4 text-lg leading-relaxed">{product.description}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold">
              Specifications
            </h2>
            {product.specs.length > 0 ? (
              <table className="mt-4 w-full border-collapse text-[0.9375rem]">
                <tbody>
                  {product.specs.map((spec) => (
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
                  {product.specsPrompt ?? DEFAULT_SPECS_PROMPT}
                </p>
                <WhatsAppButton
                  className="mt-5"
                  variant="outline"
                  message={specsMessage(product.name, product.brand)}
                >
                  Ask on WhatsApp
                </WhatsAppButton>
              </>
            )}
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="py-12 sm:py-16">
          <h2 className="font-display mb-8 text-2xl font-extrabold">
            Related products
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
