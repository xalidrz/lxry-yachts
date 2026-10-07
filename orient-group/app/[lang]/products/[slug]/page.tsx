import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductView } from "@/components/product-view";
import { getCategory } from "@/data/categories";
import { getProduct, products } from "@/data/products";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, productPath } from "@/lib/i18n";
import { pageMetadata, productMetaDescription, productTitle } from "@/lib/seo";

/** One page per product, e.g. /en/products/r32-refrigerant-gas. Built at build time. */
export const dynamicParams = false;

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const product = getProduct(slug);
  if (!product) return {};
  // "R32 Refrigerant Gas Supplier in Kuwait | Orient Group Gulf"
  const title = `${productTitle(product, lang)} ${getDictionary(lang).seo.supplierInKuwait}`;
  return pageMetadata({
    locale: lang,
    path: productPath(slug),
    title,
    description: productMetaDescription(product, lang),
    absoluteTitle: true,
    image: product.image ? { url: product.image, alt: title } : undefined,
  });
}

export default async function ProductPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  if (!category) notFound();
  return <ProductView product={product} category={category} locale={lang} />;
}
