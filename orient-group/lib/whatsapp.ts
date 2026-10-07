import { WHATSAPP_NUMBER } from "./site";

/** Message templates are per language, in lib/dictionaries.ts (`wa`). */
export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Brand value used for products that are supplied in several brands. */
export const ANY_BRAND = "Various brands";

/** "Name (Brand)", or just the name for multi-brand products. */
export function productLabel(name: string, brand: string) {
  return brand === ANY_BRAND ? name : `${name} (${brand})`;
}
