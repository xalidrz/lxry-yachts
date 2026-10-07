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

export function SiteHeader({ locale, logo }: { locale: Locale; logo: Logo | null }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  // The menu is "open" only for the page it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const headerRef = useRef<HTMLElement>(null);

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
    <header ref={headerRef} className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex h-16 items-center justify-between gap-3 rounded-[22px] border border-black/[0.06] bg-white/85 ps-4 pe-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-[16px] min-[1180px]:ps-5 min-[1180px]:pe-4">
          <Link
            href={localePath(locale, "/")}
            className="flex min-w-0 shrink items-center sm:shrink-0"
          >
            <SiteLogo
              logo={logo}
              alt={t.legalName}
              priority
              className="h-8 max-w-full sm:h-10"
              textClassName="text-[17px] text-foreground min-[420px]:text-xl sm:text-[22px]"
            />
          </Link>

          <nav aria-label={t.nav.main} className="hidden min-[1180px]:block">
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

          <div className="flex shrink-0 items-center gap-1.5 min-[420px]:gap-2 min-[1180px]:gap-5">
            <LanguageToggle locale={locale} className="hidden min-[1180px]:flex" />
            <a
              href={`tel:${OFFICE_PHONE.tel}`}
              aria-label={t.nav.callUs(OFFICE_PHONE.display)}
              className="inline-flex size-11 items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover min-[420px]:w-auto min-[420px]:px-5 min-[420px]:text-[15px]"
            >
              <Phone className="size-[18px]" aria-hidden="true" />
              <span dir="ltr" className="hidden min-[420px]:inline">
                {OFFICE_PHONE.display}
              </span>
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpenFor(open ? null : pathname)}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-150 hover:bg-black/5 min-[1180px]:hidden"
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
            className="absolute inset-x-0 top-[72px] rounded-[22px] border border-black/[0.06] bg-white/85 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-[16px] min-[1180px]:hidden"
          >
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
                        "flex min-h-12 items-center rounded-xl px-4 text-sm hover:bg-black/[0.04] rtl:text-base",
                        isActive(link.href) && "text-foreground",
                      )}
                    >
                      {t.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-2 flex items-center justify-between border-t border-black/[0.06] px-4 pt-3 pb-1">
              <span className="text-xs tracking-[0.14em] text-brand-grey uppercase">
                {t.nav.language}
              </span>
              <LanguageToggle locale={locale} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
