"use client";

import { MessageCircle } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/data/site";

/** Sticky pill, bottom-right (bottom-left in RTL). */
export function WhatsAppFab() {
  const { t } = useLang();
  return (
    <Button
      asChild
      size="md"
      className="fixed bottom-4 end-4 z-40 h-12 bg-ink/80 px-5 shadow-[0_10px_30px_-8px_rgba(0,0,0,.9),0_0_22px_rgba(201,162,74,.25)] backdrop-blur-xl sm:bottom-6 sm:end-6"
    >
      <a href={whatsappLink(t.whatsappMessages.general)} target="_blank" rel="noopener noreferrer" aria-label={t.fab.aria}>
        <MessageCircle />
        {t.fab.label}
      </a>
    </Button>
  );
}
