"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { SiteLogo } from "@/components/site-logo";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import type { Logo } from "@/lib/logo";
import { NAV_LINKS, OFFICE_PHONE } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinkClass =
  "font-semibold uppercase tracking-[0.14em] text-brand-grey transition-colors duration-150 hover:text-brand";

/** White sticky bar: logo left, links centre, red Call button right. A thin border appears once the page scrolls. */
export function SiteHeader({ locale, logo }: { locale: Locale; logo: Logo | null }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  // The menu is "open" only for the page it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpenFor(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const basePath = stripLocale(pathname);
  const isActive = (href: string) => basePath === href || basePath.startsWith(`${href}/`);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-colors duration-200",
        scrolled || open ? "border-border" : "border-transparent",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={localePath(locale, "/")} className="flex shrink-0 items-center">
          <SiteLogo
            logo={logo}
            alt={t.legalName}
            priority
            className="h-10 max-w-full"
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
                  className={cn(navLinkClass, isActive(link.href) && "text-foreground")}
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 min-[1024px]:gap-5">
          <LanguageToggle locale={locale} className="hidden min-[1024px]:flex" />
          <a
            href={`tel:${OFFICE_PHONE.tel}`}
            aria-label={t.nav.callUs(OFFICE_PHONE.display)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
          >
            <Phone className="size-[18px]" aria-hidden="true" />
            {t.common.call}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpenFor(open ? null : pathname)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-150 hover:bg-black/5 min-[1024px]:hidden"
          >
            {open ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b bg-white px-4 pt-2 pb-4 shadow-[0_12px_24px_rgba(0,0,0,0.08)] min-[1024px]:hidden"
        >
          <nav aria-label={t.nav.mobile} className="mx-auto max-w-[1200px]">
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
                      isActive(link.href) && "text-foreground",
                    )}
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between border-t px-3 pt-3">
              <span className="text-xs tracking-[0.14em] text-brand-grey uppercase">
                {t.nav.language}
              </span>
              <LanguageToggle locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
