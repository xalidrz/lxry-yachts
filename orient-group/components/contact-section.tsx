import { ContactDetails } from "@/components/contact-details";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/** Contact block used on the home page and (with an H1 in the page hero) on /contact. */
export function ContactSection({
  locale,
  asPage = false,
}: {
  locale: Locale;
  /** True on /contact, where the heading is the page's H1 (and sits in the page hero instead). */
  asPage?: boolean;
}) {
  const t = getDictionary(locale);
  return (
    <Section id="contact" tone="light">
      {!asPage && (
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title}>
          {t.contact.text}
        </SectionHeading>
      )}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <ContactDetails tone="light" locale={locale} />
        </div>
        <WhatsAppCta locale={locale} />
      </div>
    </Section>
  );
}
