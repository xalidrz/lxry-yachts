import type { Metadata } from "next";

import { Brands } from "@/components/home/brands";
import { Categories } from "@/components/home/categories";
import { Engraving } from "@/components/home/engraving";
import { Gases } from "@/components/home/gases";
import { Hero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale, type LangParams } from "@/lib/page-params";
import { localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/",
    title: t.seo.homeTitle,
    description: t.seo.homeDescription,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: LangParams) {
  const locale = await getLocale(params);
  return (
    <>
      <JsonLd data={localBusinessJsonLd(locale)} />
      <Hero locale={locale} />
      <Categories locale={locale} />
      <Gases locale={locale} />
      <Brands locale={locale} />
      <Engraving locale={locale} />
      <Testimonials locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
