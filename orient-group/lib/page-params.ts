import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./i18n";

export type LangParams = { params: Promise<{ lang: string }> };

/** Resolve the `lang` route param to a Locale, or 404 if it is not one. */
export async function getLocale(params: LangParams["params"]): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
