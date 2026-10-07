import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryView } from "@/components/category-view";
import { ProductView } from "@/components/product-view";
import { categories, getCategory } from "@/data/categories";
import { getProduct, products } from "@/data/products";
import {
  OG_IMAGE,
  categoryMetaDescription,
  productMetaDescription,
  productTitle,
} from "@/lib/seo";

/**
 * One dynamic segment serves both category pages (/products/hvac) and product
 * pages (/products/pancake-copper-coils). Everything is generated at build time.
 */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...categories.map((c) => ({ slug: c.slug })),
    ...products.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategory(slug);
  if (category) {
    const title = `${category.name} Products in Kuwait`;
    const description = categoryMetaDescription(category);
    return {
      title,
      description,
      alternates: { canonical: `/products/${slug}` },
      openGraph: {
        title: `${title} | Orient Group Gulf Kuwait`,
        description,
        url: `/products/${slug}`,
        images: [OG_IMAGE],
      },
    };
  }

  const product = getProduct(slug);
  if (!product) return {};
  const title = productTitle(product);
  const description = productMetaDescription(product);
  return {
    title,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      type: "website",
      title: `${title} | Orient Group Gulf Kuwait`,
      description,
      url: `/products/${slug}`,
      images: product.image ? [{ url: product.image, alt: title }] : [OG_IMAGE],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const category = getCategory(slug);
  if (category) return <CategoryView category={category} />;

  const product = getProduct(slug);
  if (!product) notFound();
  const productCategory = getCategory(product.category);
  if (!productCategory) notFound();

  return <ProductView product={product} category={productCategory} />;
}
