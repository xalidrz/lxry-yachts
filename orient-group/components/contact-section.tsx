import Image from "next/image";

import { CatalogueLink } from "@/components/catalogue-link";
import { ContactDetails } from "@/components/contact-details";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { aboutImages } from "@/data/about-images";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { GOOGLE_MAPS_EMBED_URL } from "@/lib/site";

/** Contact block used on the home page and (with an H1 in the page hero) on /contact. */
export function ContactSection({
  locale,
  asPage = false,
}: {
  locale: Locale;
  /** True on /contact: heading sits in the page hero, and hours, map and shop photo are shown. */
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
          <ContactDetails tone="light" locale={locale} showHours={asPage} />
        </div>
        <WhatsAppCta locale={locale} />
      </div>
      {asPage && <CatalogueLink locale={locale} className="mt-6 text-brand hover:underline" />}

      {asPage && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-2xl border bg-card">
            <iframe
              title={t.contact.mapTitle}
              src={GOOGLE_MAPS_EMBED_URL(locale)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[320px] w-full border-0 sm:h-[420px]"
            />
          </div>
          <Image
            src={aboutImages.shopFront.src}
            alt={aboutImages.shopFront.alt[locale]}
            width={aboutImages.shopFront.width}
            height={aboutImages.shopFront.height}
            sizes="(min-width: 1024px) 400px, 100vw"
            className="h-full max-h-[420px] min-h-[220px] w-full rounded-2xl border object-cover"
          />
        </div>
      )}
    </Section>
  );
}
