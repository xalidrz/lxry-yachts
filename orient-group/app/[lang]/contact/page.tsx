import type { Metadata } from "next";

import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import { getLocale, type LangParams } from "@/lib/page-params";
import { breadcrumbJsonLd, localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/contact",
    title: t.seo.contactTitle,
    description: t.seo.contactDescription,
  });
}

export default async function ContactPage({ params }: LangParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return (
    <>
      <JsonLd data={localBusinessJsonLd(locale)} />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.nav.home, path: "/" },
          { name: t.nav.contact, path: "/contact" },
        ])}
      />
      <PageHero
        locale={locale}
        title={t.contact.pageTitle}
        crumbs={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: t.nav.contact }]}
      >
        {t.contact.pageIntro}
      </PageHero>
      <ContactSection locale={locale} asPage />
    </>
  );
}
