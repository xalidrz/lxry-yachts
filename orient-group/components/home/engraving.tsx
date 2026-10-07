import Link from "next/link";

import { EngravingIcon } from "@/components/engraving-icon";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { getEngravingItems } from "@/data/engraving";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

export function Engraving({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section tone="dark" id="engraving">
      <SectionHeading
        tone="dark"
        eyebrow={t.home.engravingEyebrow}
        title={t.home.engravingTitle}
      >
        {t.home.engravingText}
      </SectionHeading>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {getEngravingItems(locale).map(({ icon, title, text }) => (
          <li
            key={title}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-6"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-on-dark">
              <EngravingIcon icon={icon} className="size-6" />
            </span>
            <h3 className="font-display mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 leading-relaxed text-on-dark-muted">{text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <WhatsAppButton message={t.wa.labelList} size="lg">
          {t.home.sendLabelList}
        </WhatsAppButton>
        <Button asChild variant="secondary-dark" size="lg">
          <Link href={localePath(locale, "/engraving")}>{t.home.howToOrderLabels}</Link>
        </Button>
      </div>
    </Section>
  );
}
