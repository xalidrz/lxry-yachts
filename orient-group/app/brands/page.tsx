import type { Metadata } from "next";
import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";
import { brandMessage } from "@/lib/whatsapp";

const title = "Brands We Supply in Kuwait";
const description =
  "Venture, Bossong, NSK, Unistrut, Copeland and more: the HVAC, fixing, electrical and bearing brands Orient Group Gulf supplies from Shuwaikh, Kuwait.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/brands" },
  openGraph: {
    title: `${title} | Orient Group Gulf Kuwait`,
    description,
    url: "/brands",
    images: [OG_IMAGE],
  },
};

export default function BrandsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
        ])}
      />
      <PageHero
        title="Brands we supply"
        crumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      >
        {brands.length} brands across HVAC, fixing systems, electrical and
        bearings. Not every product is listed online, so ask us about any brand.
      </PageHero>
      <Section className="pt-10 sm:pt-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => {
            const items = products.filter((p) => p.brand === brand.name);
            return (
              <li
                key={brand.name}
                className="flex flex-col rounded-2xl border bg-card p-6"
              >
                <div className="flex items-center gap-4">
                  <BrandLogo brand={brand} sizes="64px" className="size-16 shrink-0 p-1" />
                  <h2 className="font-display text-xl font-bold">{brand.name}</h2>
                </div>
                {items.length > 0 ? (
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-[0.9375rem] underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 flex-1 text-[0.9375rem] text-muted-foreground">
                    Ask us which {brand.name} products are available.
                  </p>
                )}
                <WhatsAppButton
                  message={brandMessage(brand.name)}
                  size="sm"
                  variant="outline"
                  className="mt-6 self-start"
                  ariaLabel={`Ask about ${brand.name} products on WhatsApp`}
                >
                  Ask about {brand.name}
                </WhatsAppButton>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
