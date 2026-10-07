/**
 * Locale scaffolding. Only English is live; Arabic can be switched on later by
 * adding translated copy and a locale-aware route (e.g. app/[locale]).
 * Layout and components already use logical (start/end) spacing so RTL flips cleanly.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const activeLocales: readonly Locale[] = ["en"];

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};
