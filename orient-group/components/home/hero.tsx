import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { aboutImages } from "@/data/about-images";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { OFFICE_PHONE } from "@/lib/site";

/** White split hero: text on one side, the real shop photo on the other. */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const photo = aboutImages.shopFront;

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-14 lg:grid-cols-2 lg:gap-14 lg:pt-36 lg:pb-20">
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.16em] text-brand uppercase">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-[2.125rem] leading-[1.12] font-extrabold text-foreground sm:text-5xl lg:text-[3.25rem]">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t.hero.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton message={t.wa.quote} size="lg">
              {t.hero.quote}
            </WhatsAppButton>
            <Button asChild variant="primary" size="lg">
              <Link href={localePath(locale, "/products")}>{t.common.browseProducts}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={`tel:${OFFICE_PHONE.tel}`}>
                <Phone aria-hidden="true" />
                {t.common.call} <span dir="ltr">{OFFICE_PHONE.display}</span>
              </a>
            </Button>
          </div>
        </div>

        <Image
          src={photo.src}
          alt={photo.alt[locale]}
          width={photo.width}
          height={photo.height}
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="aspect-[4/3] w-full rounded-[24px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
        />
      </div>
    </section>
  );
}
