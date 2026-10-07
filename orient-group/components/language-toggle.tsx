"use client";

import { usePathname } from "next/navigation";

import { getDictionary } from "@/lib/dictionaries";
import { localePath, rememberLocale, stripLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { locale: Locale; label: string }[] = [
  { locale: "ar", label: "عربي" },
  { locale: "en", label: "EN" },
];

/**
 * "عربي / EN". Links to the same page in the other language and remembers the
 * choice in a cookie for a year, so proxy.ts sends the visitor to that language
 * next time. Plain <a> links, because the page direction (RTL/LTR) changes.
 */
export function LanguageToggle({ locale, className }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const base = stripLocale(pathname);

  return (
    <div role="group" aria-label={t.nav.language} className={cn("flex items-center gap-1.5 text-sm", className)}>
      {options.map((option, i) => {
        const active = option.locale === locale;
        return (
          <span key={option.locale} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-border">
                /
              </span>
            )}
            {active ? (
              <span
                lang={option.locale}
                aria-current="true"
                className="px-1 font-bold text-foreground"
              >
                {option.label}
              </span>
            ) : (
              <a
                href={localePath(option.locale, base)}
                lang={option.locale}
                hrefLang={option.locale}
                onClick={() => rememberLocale(option.locale)}
                className="inline-flex min-h-11 items-center rounded px-1 text-toggle-inactive transition-colors duration-150 hover:text-brand"
              >
                {option.label}
              </a>
            )}
          </span>
        );
      })}
    </div>
  );
}
