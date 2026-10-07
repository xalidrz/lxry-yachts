import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryView } from "@/components/category-view";
import { ProductView } from "@/components/product-view";
import { categories, getCategory, localizeCategory } from "@/data/categories";
import { getProduct, products } from "@/data/products";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import {
  categoryMetaDescription,
  pageMetadata,
  productMetaDescription,
  productTitle,
} from "@/lib/seo";

/**
 * One dynamic segment serves both category pages (/products/hvac) and product
 * pages (/products/pancake-copper-coils), in both languages. Everything is
 * generated at build time.
 */
export const dynamicParams = false;

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return [
    ...categories.map((c) => ({ slug: c.slug })),
    ...products.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  const category = getCategory(slug);
  if (category) {
    return pageMetadata({
      locale: lang,
      path: `/products/${slug}`,
      title:
        category.slug === "hvac"
          ? t.seo.hvacCategoryTitle
          : t.seo.categoryTitle(localizeCategory(category, lang).name),
      description: categoryMetaDescription(category, lang),
    });
  }

  const product = getProduct(slug);
  if (!product) return {};
  const title = productTitle(product, lang);
  return pageMetadata({
    locale: lang,
    path: `/products/${slug}`,
    title,
    description: productMetaDescription(product, lang),
    image: product.image ? { url: product.image, alt: title } : undefined,
  });
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const category = getCategory(slug);
  if (category) return <CategoryView category={category} locale={lang} />;

  const product = getProduct(slug);
  if (!product) notFound();
  const productCategory = getCategory(product.category);
  if (!productCategory) notFound();

  return <ProductView product={product} category={productCategory} locale={lang} />;
}
