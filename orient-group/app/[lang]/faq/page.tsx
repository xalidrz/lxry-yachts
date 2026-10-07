import type { Metadata } from "next";

import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { getFaqs } from "@/data/faq";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import { getLocale, type LangParams } from "@/lib/page-params";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/faq",
    title: t.seo.faqTitle,
    description: t.seo.faqDescription,
  });
}

export default async function FaqPage({ params }: LangParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const faqs = getFaqs(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.nav.home, path: "/" },
          { name: t.nav.faq, path: "/faq" },
        ])}
      />
      <PageHero
        locale={locale}
        title={t.faq.pageTitle}
        crumbs={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: t.nav.faq }]}
      >
        {t.faq.intro}
      </PageHero>
      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqList faqs={faqs} />
        </div>
      </Section>
      <Section tone="white" className="pt-0 sm:pt-0">
        <WhatsAppCta locale={locale} className="lg:flex-row lg:items-center" />
      </Section>
    </>
  );
}
