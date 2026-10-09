"use client";

import { Clock, Facebook, Phone } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/10 bg-ink pb-28 pt-14 sm:pb-14">
      <div className="container flex flex-col items-center gap-6 text-center">
        <Logo size={72} className="size-16 md:size-[4.5rem]" />
        <div>
          <p className="font-display text-2xl font-semibold text-cream">AM Hairdresser Salon</p>
          <p className="font-arabic mt-1 text-lg text-gold" lang="ar" dir="rtl">إي إم هيردريسر صالون</p>
        </div>
        <div className="flex flex-col items-center gap-3 text-cream/75 sm:flex-row sm:gap-8">
          <a href={`tel:${site.phoneTel}`} className="inline-flex items-center gap-2 hover:text-gold-light">
            <Phone className="size-4 text-gold" />
            <span dir="ltr">{site.phoneDisplay}</span>
          </a>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4 text-gold" />
            {t.location.hoursValue}
          </span>
        </div>
        <Button asChild variant="ghost" size="icon" className="size-12">
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label={t.footer.facebookLabel}>
            <Facebook />
          </a>
        </Button>
        <p className="text-sm text-cream/50">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
