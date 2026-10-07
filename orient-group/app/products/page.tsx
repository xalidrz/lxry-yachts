import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ProductBrowser } from "@/components/product-browser";
import { Section } from "@/components/section";
import { categories } from "@/data/categories";
import { productSearchText, products } from "@/data/products";
import { OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";

const title = "HVAC, Electrical and Fixing Products";
const description =
  "Browse every product Orient Group Gulf supplies in Kuwait: copper pipes, refrigerant gases, chemical anchors, conduits, cables, switchgear and NSK bearings. Ask for price on WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: `${title} | Orient Group Gulf Kuwait`,
    description,
    url: "/products",
    images: [OG_IMAGE],
  },
};

export default function ProductsPage() {
  const browserProducts = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    shortDescription: p.shortDescription,
    image: p.image,
    searchText: productSearchText(p),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <PageHero
        title="Products"
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      >
        Product reference for contractors and installers. We do not sell online:
        ask for a price on WhatsApp and we reply with price and delivery.
      </PageHero>
      <Section className="pt-10 sm:pt-12">
        <ProductBrowser
          products={browserProducts}
          categories={categories.map((c) => ({ slug: c.slug, title: c.title }))}
        />
      </Section>
    </>
  );
}
