import { getDictionary } from "./dictionaries";
import type { Locale } from "./i18n";
import type { QuoteItem } from "./quote-store";
import { productLabel, whatsappUrl } from "./whatsapp";

export type QuoteDetails = { name?: string; company?: string; phone?: string };

/**
 * "Hello Orient Group Gulf, I'd like a price for:" followed by one line per
 * item with its quantity, then the visitor's details if they filled them in.
 */
export function buildQuoteMessage(locale: Locale, items: QuoteItem[], details: QuoteDetails = {}) {
  const t = getDictionary(locale).quote;
  const lines = items.map(
    (item, i) => `${i + 1}. ${productLabel(item.name[locale], item.brand)} × ${item.qty}`,
  );
  const extra = [
    details.name?.trim() && `${t.name}: ${details.name.trim()}`,
    details.company?.trim() && `${t.company}: ${details.company.trim()}`,
    details.phone?.trim() && `${t.phone}: ${details.phone.trim()}`,
  ].filter(Boolean) as string[];
  return [t.intro, "", ...lines, ...(extra.length ? ["", ...extra] : [])].join("\n");
}

export function quoteWhatsappUrl(locale: Locale, items: QuoteItem[], details?: QuoteDetails) {
  return whatsappUrl(buildQuoteMessage(locale, items, details));
}
