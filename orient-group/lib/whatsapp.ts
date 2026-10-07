import { WHATSAPP_NUMBER } from "./site";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Brand value used for products that are supplied in several brands. */
export const ANY_BRAND = "Various brands";

export function productLabel(name: string, brand: string) {
  return brand === ANY_BRAND ? name : `${name} (${brand})`;
}

export function priceMessage(name: string, brand: string) {
  return `Hello Orient Group, please send me a price for: ${productLabel(name, brand)}`;
}

export function specsMessage(name: string, brand: string) {
  return `Hello Orient Group, please send me the specifications and availability for: ${productLabel(name, brand)}`;
}

export function brandMessage(brand: string) {
  return `Hello Orient Group, which ${brand} products do you supply? Please send me prices.`;
}

export function productWhatsappUrl(name: string, brand: string) {
  return whatsappUrl(priceMessage(name, brand));
}

export const GENERAL_MESSAGE =
  "Hello Orient Group, I would like to ask about your products.";

export function gasMessage(gas: string) {
  return `Hello Orient Group, please send me the price and available cylinder sizes for ${gas} refrigerant gas.`;
}

export function searchMessage(term: string) {
  return `Hello Orient Group, I am looking for: ${term}. Do you have it in stock? Please send me a price.`;
}

export const LABEL_LIST_MESSAGE =
  "Hello Orient Group, I would like a quote for engraving and labelling. I will send my label list here.";
export const QUOTE_MESSAGE =
  "Hello Orient Group, I would like to request a quote. Here is my list of materials:";
