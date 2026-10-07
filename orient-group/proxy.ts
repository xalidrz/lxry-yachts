import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE } from "@/lib/i18n";

/**
 * Language routing. Every page lives under /en or /ar. A URL without a prefix
 * (/, /products) is redirected to the visitor's language: Arabic if they chose
 * it before (cookie), English otherwise. Search engines send no cookie, so they
 * land on /en.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return;
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return;

  const locale = request.cookies.get(LOCALE_COOKIE)?.value === "ar" ? "ar" : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  // 307: the target depends on the visitor's cookie, so it must not be cached as permanent.
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Skip Next internals and any path with a file extension (images, icons,
  // robots.txt, sitemap.xml, favicon.ico).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
