import { MessageCircle } from "lucide-react";

import { GENERAL_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

/** Round 56px WhatsApp button fixed bottom-right on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(GENERAL_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Orient Group on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-colors duration-150 hover:bg-whatsapp-hover sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
