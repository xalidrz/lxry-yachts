import { MessageCircle } from "lucide-react";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

/** Round 56px WhatsApp button fixed bottom-right on every page (bottom-left in Arabic/RTL). */
export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <a
      href={whatsappUrl(t.wa.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.chatAria}
      className="fixed end-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-colors duration-150 hover:bg-whatsapp-hover sm:end-6 sm:bottom-6"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
