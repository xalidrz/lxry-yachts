import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { categories, type Category } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { GENERAL_MESSAGE } from "@/lib/whatsapp";

export function CategoryView({ category }: { category: Category }) {
  const items = getProductsByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: category.name, path: `/products/${category.slug}` },
        ])}
      />
      <PageHero
        title={category.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name },
        ]}
      >
        {category.intro}
      </PageHero>
      <Section className="pt-10 sm:pt-12">
        <nav aria-label="Product categories" className="mb-8">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:border-steel"
              >
                All
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  aria-current={c.slug === category.slug ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border px-5 text-[0.9375rem] font-semibold transition-colors duration-150",
                    c.slug === category.slug
                      ? "border-steel bg-steel text-white"
                      : "border-border bg-white hover:border-steel",
                  )}
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <li key={p.slug}>
              <ProductCard product={p} priority={i < 4} />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-lg">
            We stock more than is listed here. Tell us what you need and we will
            check availability.
          </p>
          <WhatsAppButton message={GENERAL_MESSAGE}>Ask us on WhatsApp</WhatsAppButton>
        </div>
      </Section>
    </>
  );
}
