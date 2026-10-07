import { Phone } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { OFFICE_PHONE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The dark "Need a price?" block with the WhatsApp and Call buttons. */
export function WhatsAppCta({ locale, className }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  return (
    <div
      className={cn(
        "on-dark flex flex-col justify-between gap-8 rounded-2xl bg-charcoal p-6 text-on-dark sm:p-8",
        className,
      )}
    >
      <div>
        <h2 className="font-display text-2xl leading-snug font-extrabold">{t.contact.needPrice}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-on-dark-muted">{t.contact.needPriceText}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <WhatsAppButton message={t.wa.general}>{t.common.chatOnWhatsApp}</WhatsAppButton>
        <Button asChild variant="secondary-dark">
          <a href={`tel:${OFFICE_PHONE.tel}`}>
            <Phone aria-hidden="true" />
            {t.common.call} <span dir="ltr">{OFFICE_PHONE.display}</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
