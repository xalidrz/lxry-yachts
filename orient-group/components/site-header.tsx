"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { SiteLogo } from "@/components/site-logo";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import type { Logo } from "@/lib/logo";
import { NAV_LINKS, OFFICE_PHONE } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinkClass =
  "font-semibold uppercase tracking-[0.14em] text-brand-grey transition-colors duration-150 hover:text-brand";

const callClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand-hover";

/**
 * Floating pill navbar: logo left, links centre, red Call button right. It stays
 * at the top while scrolling. Below 1024px it shows the logo and a menu button,
 * and the menu opens as a side Sheet with the links, language toggle and Call.
 */
export function SiteHeader({ locale, logo }: { locale: Locale; logo: Logo | null }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  // The menu is "open" only for the page it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  const basePath = stripLocale(pathname);
  const isActive = (href: string) => basePath === href || basePath.startsWith(`${href}/`);
  const activeClass = "text-brand";

  return (
    // Zero-height sticky wrapper: the pill floats over the page without pushing it down.
    <header className="sticky top-0 z-50 h-0">
      <div className="pointer-events-none absolute inset-x-0 top-4 px-4">
        <div className="pointer-events-auto mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 rounded-full border border-[#e7e5e4] bg-[rgba(245,245,244,0.9)] ps-6 pe-3 shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-[16px] min-[1024px]:pe-3">
          <Link
            href={localePath(locale, "/")}
            className="flex shrink-0 items-center rounded-none outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
          >
            <SiteLogo
              logo={logo}
              alt={t.legalName}
              priority
              className="h-[30px] max-w-full sm:h-9"
              textClassName="text-xl text-foreground"
            />
          </Link>

          <nav aria-label={t.nav.main} className="hidden min-[1024px]:block">
            <ul className="flex items-center gap-7 text-[13px] rtl:text-[15px]">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={localePath(locale, link.href)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(navLinkClass, isActive(link.href) && activeClass)}
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-5">
            <LanguageToggle locale={locale} className="hidden min-[1024px]:flex" />
            <a
              href={`tel:${OFFICE_PHONE.tel}`}
              aria-label={t.nav.callUs(OFFICE_PHONE.display)}
              className={cn(callClass, "hidden min-[1024px]:inline-flex")}
            >
              <Phone className="size-[18px]" aria-hidden="true" />
              {t.common.call}
            </a>

            <Sheet open={open} onOpenChange={(o) => setOpenFor(o ? pathname : null)}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t.nav.openMenu}
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-150 hover:bg-black/5 min-[1024px]:hidden"
                >
                  <Menu className="size-6" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent closeLabel={t.nav.closeMenu}>
                <SheetTitle className="font-display text-xl font-extrabold">{t.nav.menu}</SheetTitle>
                <SheetDescription className="sr-only">{t.nav.mobile}</SheetDescription>
                <nav aria-label={t.nav.mobile}>
                  <ul>
                    {NAV_LINKS.map((link) => (
                      <li key={link.key}>
                        <Link
                          href={localePath(locale, link.href)}
                          onClick={() => setOpenFor(null)}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className={cn(
                            navLinkClass,
                            "flex min-h-12 items-center rounded-xl px-3 text-sm hover:bg-black/[0.04] rtl:text-base",
                            isActive(link.href) && activeClass,
                          )}
                        >
                          {t.nav[link.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-xs tracking-[0.14em] text-brand-grey uppercase">
                    {t.nav.language}
                  </span>
                  <LanguageToggle locale={locale} />
                </div>
                <a
                  href={`tel:${OFFICE_PHONE.tel}`}
                  aria-label={t.nav.callUs(OFFICE_PHONE.display)}
                  className={cn(callClass, "w-full")}
                >
                  <Phone className="size-[18px]" aria-hidden="true" />
                  {t.common.call} <span dir="ltr">{OFFICE_PHONE.display}</span>
                </a>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
