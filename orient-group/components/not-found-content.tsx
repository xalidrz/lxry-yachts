"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import { localeFromPathname, localePath } from "@/lib/i18n";

/** 404 body. A not-found page gets no route params, so the language comes from the URL. */
export function NotFoundContent() {
  const locale = localeFromPathname(usePathname());
  const t = getDictionary(locale);
  return (
    <>
      <PageHero locale={locale} title={t.notFound.title}>
        {t.notFound.text}
      </PageHero>
      <Section>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={localePath(locale, "/products")}>{t.common.browseProducts}</Link>
          </Button>
          <WhatsAppButton message={t.wa.general}>{t.common.askUsOnWhatsApp}</WhatsAppButton>
        </div>
      </Section>
    </>
  );
}
