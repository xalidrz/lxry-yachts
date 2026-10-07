import type { Metadata } from "next";
import { Check } from "lucide-react";

import { EngravingIcon } from "@/components/engraving-icon";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getEngravingItems, getLabelListChecklist } from "@/data/engraving";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import { getLocale, type LangParams } from "@/lib/page-params";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/engraving",
    title: t.seo.engravingTitle,
    description: t.seo.engravingDescription,
  });
}

export default async function EngravingPage({ params }: LangParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.nav.home, path: "/" },
          { name: t.nav.engraving, path: "/engraving" },
        ])}
      />
      <PageHero
        locale={locale}
        title={t.engravingPage.title}
        crumbs={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: t.nav.engraving }]}
      >
        {t.engravingPage.intro}
      </PageHero>

      <Section className="pt-10 sm:pt-12">
        <ul className="grid gap-5 sm:grid-cols-2">
          {getEngravingItems(locale).map(({ icon, title, text }) => (
            <li key={title} className="flex gap-5 rounded-2xl border bg-card p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-charcoal text-on-dark">
                <EngravingIcon icon={icon} className="size-6" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold">{title}</h2>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <SectionHeading title={t.engravingPage.checklistTitle} className="mb-6">
              {t.engravingPage.checklistText}
            </SectionHeading>
            <ul className="space-y-3">
              {getLabelListChecklist(locale).map((line) => (
                <li key={line} className="flex gap-3 text-lg">
                  <Check className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="on-dark rounded-2xl bg-charcoal p-6 text-on-dark sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">{t.engravingPage.readyTitle}</h2>
            <p className="mt-3 leading-relaxed text-on-dark-muted">{t.engravingPage.readyText}</p>
            <WhatsAppButton message={t.wa.labelList} size="lg" className="mt-6">
              {t.home.sendLabelList}
            </WhatsAppButton>
          </div>
        </div>
      </Section>
    </>
  );
}
