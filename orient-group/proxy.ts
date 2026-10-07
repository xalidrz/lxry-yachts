import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE } from "@/lib/i18n";

/**
 * Language routing.
 * - /ar/...      served as is (Arabic).
 * - /en/...      redirected to the plain URL, so English has one address.
 * - plain URLs   rewritten to /en/... internally. If the visitor chose Arabic
 *                before (cookie), they are redirected to the /ar version instead.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/ar" || pathname.startsWith("/ar/")) return;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (request.cookies.get(LOCALE_COOKIE)?.value === "ar") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ar" : `/ar${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any path with a file extension (images, icons,
  // robots.txt, sitemap.xml, favicon.ico).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
