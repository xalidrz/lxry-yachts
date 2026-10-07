"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ClipboardList, Menu, Phone } from "lucide-react";

import { GroupIcon } from "@/components/group-icon";
import { LanguageToggle } from "@/components/language-toggle";
import { SiteLogo } from "@/components/site-logo";
import { MegaMenuPanel, groupHref } from "@/components/mega-menu";
import { QuoteNavButton } from "@/components/quote/quote-nav-button";
import { useQuoteUI } from "@/components/quote/quote-provider";
import { useQuoteCount } from "@/components/quote/use-quote";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getGroupItems, shopGroups } from "@/data/shop-groups";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, productPath, stripLocale, type Locale } from "@/lib/i18n";
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
  // Same idea for the desktop mega menu: it belongs to the page it was opened on.
  const [megaFor, setMegaFor] = useState<string | null>(null);
  const megaOpen = megaFor === pathname;
  const megaId = useId();
  const megaRef = useRef<HTMLDivElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);
  const { setOpen: setQuoteOpen } = useQuoteUI();
  const quoteCount = useQuoteCount();

  useEffect(() => {
    if (!megaOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaFor(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaFor(null);
        megaButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [megaOpen]);

  const basePath = stripLocale(pathname);
  const isActive = (href: string) => basePath === href || basePath.startsWith(`${href}/`);
  const activeClass = "text-brand";

  return (
    // Zero-height sticky wrapper: the pill floats over the page without pushing it down.
    <header className="sticky top-0 z-50 h-0">
      <div className="pointer-events-none absolute inset-x-0 top-4 px-4">
        <div ref={megaRef} className="pointer-events-auto relative mx-auto max-w-[1200px]" onPointerLeave={(e) => { if (e.pointerType === "mouse") setMegaFor(null); }}>
        <div className="flex h-16 items-center justify-between gap-3 rounded-full border border-[#e7e5e4] bg-[rgba(245,245,244,0.9)] ps-6 pe-3 shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-[16px] min-[1024px]:pe-3">
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
            <ul className="flex items-center gap-6 text-[13px] min-[1100px]:gap-7 rtl:text-[15px]">
              {NAV_LINKS.map((link) =>
                link.key === "products" ? (
                  <li key={link.key} onPointerEnter={(e) => { if (e.pointerType === "mouse") setMegaFor(pathname); }}>
                    <button
                      ref={megaButtonRef}
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls={megaId}
                      onClick={() => setMegaFor(megaOpen ? null : pathname)}
                      className={cn(navLinkClass, "inline-flex cursor-pointer items-center gap-1 uppercase", (isActive("/products") || isActive("/categories") || megaOpen) && activeClass)}
                    >
                      {t.nav.products}
                      <ChevronDown className={cn("size-4 transition-transform duration-150", megaOpen && "rotate-180")} aria-hidden="true" />
                    </button>
                  </li>
                ) : (
                <li key={link.key}>
                  <Link
                    href={localePath(locale, link.href)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(navLinkClass, isActive(link.href) && activeClass)}
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3 min-[1100px]:gap-4">
            <LanguageToggle locale={locale} className="hidden min-[1024px]:flex" />
            <QuoteNavButton
              locale={locale}
              className="hidden min-[1024px]:inline-flex"
              labelClassName="hidden min-[1200px]:inline"
            />
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
                <nav aria-label={t.nav.mobile} className="min-h-0 flex-1 overflow-y-auto">
                  <ul>
                    <li>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="products" className="border-b-0">
                          <AccordionTrigger className={cn(navLinkClass, "rounded-xl px-3 text-sm hover:bg-black/[0.04] rtl:text-base", isActive("/products") && activeClass)}>
                            {t.nav.products}
                          </AccordionTrigger>
                          <AccordionContent className="pb-2 ps-3">
                            <Link
                              href={localePath(locale, "/products")}
                              onClick={() => setOpenFor(null)}
                              className="flex min-h-11 items-center rounded-xl px-3 text-[0.9375rem] font-semibold text-brand hover:bg-black/[0.04]"
                            >
                              {t.nav.allProducts}
                            </Link>
                            <Accordion type="single" collapsible>
                              {shopGroups.map((group) => (
                                <AccordionItem key={group.key} value={group.key}>
                                  <AccordionTrigger className="min-h-11 px-3 py-2 text-[0.9375rem]">
                                    <span className="flex items-center gap-3">
                                      <GroupIcon icon={group.icon} className="size-[18px] text-brand" strokeWidth={1.75} />
                                      {t.shop.groups[group.key]}
                                    </span>
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-2 ps-10">
                                    <Link
                                      href={groupHref(locale, group.key, group.href)}
                                      onClick={() => setOpenFor(null)}
                                      className="flex min-h-10 items-center text-[0.9375rem] font-semibold text-brand"
                                    >
                                      {t.shop.viewAll}
                                    </Link>
                                    {getGroupItems(group, locale)
                                      .slice(0, 8)
                                      .map((item) => (
                                        <Link
                                          key={item.slug || item.label}
                                          href={item.slug ? localePath(locale, productPath(item.slug)) : localePath(locale, "/engraving")}
                                          onClick={() => setOpenFor(null)}
                                          className="flex min-h-10 items-center text-[0.9375rem] text-muted-foreground hover:text-brand"
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                    {[...NAV_LINKS.filter((l) => l.key !== "products"), { key: "faq", href: "/faq" } as const].map((link) => (
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
                <button
                  type="button"
                  onClick={() => {
                    setOpenFor(null);
                    setQuoteOpen(true);
                  }}
                  className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-white px-4 text-[15px] font-semibold"
                >
                  <ClipboardList className="size-[18px]" aria-hidden="true" />
                  {t.quote.nav}
                  <span className={cn("flex min-w-6 items-center justify-center rounded-full px-1.5 text-xs leading-6 font-bold tabular-nums", quoteCount > 0 ? "bg-brand text-white" : "bg-muted text-muted-foreground")}>
                    {quoteCount}
                  </span>
                </button>
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
        <MegaMenuPanel locale={locale} open={megaOpen} id={megaId} onNavigate={() => setMegaFor(null)} />
        </div>
      </div>
    </header>
  );
}
