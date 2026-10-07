import Image from "next/image";

import { ContactDetails } from "@/components/contact-details";
import { Section, SectionHeading } from "@/components/section";
import { aboutImages } from "@/data/about-images";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { GOOGLE_MAPS_EMBED_URL } from "@/lib/site";

/** Shop photo beside the address, phones, opening hours and an embedded map. */
export function VisitShop({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const photo = aboutImages.display;

  return (
    <Section tone="white" id="visit-shop">
      <SectionHeading eyebrow={t.contact.findUs} title={t.about.shopTitle}>
        {t.about.shopText}
      </SectionHeading>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Image
          src={photo.src}
          alt={photo.alt[locale]}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 440px, 100vw"
          className="h-full max-h-[560px] min-h-[280px] w-full rounded-2xl border object-cover object-top"
        />
        <div className="grid gap-6">
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <ContactDetails tone="light" locale={locale} showHours />
          </div>
          <div className="overflow-hidden rounded-2xl border bg-card">
            <iframe
              title={t.contact.mapTitle}
              src={GOOGLE_MAPS_EMBED_URL(locale)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[280px] w-full border-0"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
