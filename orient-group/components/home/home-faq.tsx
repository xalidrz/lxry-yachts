import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FaqList } from "@/components/faq-list";
import { Section, SectionHeading } from "@/components/section";
import { HOME_FAQ_COUNT, getFaqs } from "@/data/faq";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

/** The first three FAQs with a link to all of them. */
export function HomeFaq({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section tone="white" id="faq">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <FaqList faqs={getFaqs(locale).slice(0, HOME_FAQ_COUNT)} idPrefix="home-faq" />
        <Link
          href={localePath(locale, "/faq")}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
        >
          {t.faq.viewAll}
          <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
