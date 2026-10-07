/**
 * Two languages, both with a URL prefix: /en/products and /ar/products. The
 * proxy sends unprefixed URLs (/, /products) to the visitor's language.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeDir: Record<Locale, "ltr" | "rtl"> = { en: "ltr", ar: "rtl" };
export const ogLocale: Record<Locale, string> = { en: "en_KW", ar: "ar_KW" };

/** Cookie that remembers the visitor's chosen language. */
export const LOCALE_COOKIE = "ogg-lang";

/** Remember the visitor's language for a year (browser only). */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Public URL path for a page in a language: ("ar", "/products") -> "/ar/products". */
export function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Strip the language prefix from a pathname, giving the English path.
 * Handles "/ar/..." and the internal "/en/..." that usePathname() can report
 * on English pages (the proxy rewrites "/products" to "/en/products").
 */
export function stripLocale(pathname: string) {
  for (const prefix of ["/ar", "/en"]) {
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  return pathname;
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

/** Page paths (English form, without the language prefix). */
export const productPath = (slug: string) => `/products/${slug}`;
export const categoryPath = (slug: string) => `/categories/${slug}`;
