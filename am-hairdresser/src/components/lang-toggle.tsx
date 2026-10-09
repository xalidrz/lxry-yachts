"use client";

import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/utils";

/** "عربي / EN" — the active language is bold white, the other is muted. */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const base = "rounded-full px-1.5 py-1 text-sm transition-colors";
  return (
    <div className={cn("inline-flex items-center text-cream/55", className)} role="group" aria-label={t.nav.switchLang} dir="ltr">
      <button type="button" lang="ar" onClick={() => setLang("ar")} aria-pressed={lang === "ar"} className={cn(base, "font-arabic hover:text-gold-light", lang === "ar" && "font-bold text-white")}>
        عربي
      </button>
      <span aria-hidden className="text-white/25">/</span>
      <button type="button" lang="en" onClick={() => setLang("en")} aria-pressed={lang === "en"} className={cn(base, "hover:text-gold-light", lang === "en" && "font-bold text-white")}>
        EN
      </button>
    </div>
  );
}
