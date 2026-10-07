import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryView } from "@/components/category-view";
import { categories, getCategory, localizeCategory } from "@/data/categories";
import { getDictionary } from "@/lib/dictionaries";
import { categoryPath, isLocale } from "@/lib/i18n";
import { categoryMetaDescription, pageMetadata } from "@/lib/seo";

/** Category pages, e.g. /en/categories/hvac and /ar/categories/hvac. Built at build time. */
export const dynamicParams = false;

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const category = getCategory(slug);
  if (!category) return {};
  const t = getDictionary(lang);
  return pageMetadata({
    locale: lang,
    path: categoryPath(slug),
    title:
      category.slug === "hvac"
        ? t.seo.hvacCategoryTitle
        : t.seo.categoryTitle(localizeCategory(category, lang).name),
    description: categoryMetaDescription(category, lang),
  });
}

export default async function CategoryPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const category = getCategory(slug);
  if (!category) notFound();
  return <CategoryView category={category} locale={lang} />;
}
