import type { Metadata } from "next";

import { BrandMarquee } from "@/components/home/brand-marquee";
import { Engraving } from "@/components/home/engraving";
import { Gases } from "@/components/home/gases";
import { Hero } from "@/components/home/hero";
import { ShopByCategory } from "@/components/home/shop-by-category";
import { Testimonials } from "@/components/home/testimonials";
import { VisitShop } from "@/components/home/visit-shop";
import { WhyUs } from "@/components/home/why-us";
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
      <BrandMarquee locale={locale} />
      <ShopByCategory locale={locale} />
      <WhyUs locale={locale} />
      <Gases locale={locale} />
      <Engraving locale={locale} />
      <Testimonials locale={locale} />
      <VisitShop locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
