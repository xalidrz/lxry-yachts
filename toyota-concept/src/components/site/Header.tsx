import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Globe, Search, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { nav, utilityBar } from "@/data/content";
import { icons } from "./icons";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { NavBeam } from "./NavBeam";
import { NavEmblem } from "./NavEmblem";

const circleBtn =
  "inline-flex size-[40px] shrink-0 items-center lg:size-[44px] justify-center rounded-pill border border-[var(--nav-border)] text-white transition-colors duration-200 ease-out hover:bg-white hover:text-ink active:scale-[0.98]";

function BuildPrice({ compact }: { compact?: boolean }) {
  return (
    <a
      href={nav.cta.href}
      className={`btn-gloss inline-flex shrink-0 items-center justify-center gap-1 rounded-pill font-semibold text-white ${compact ? "!h-[40px] !px-[14px] text-small" : ""}`}
    >
      {nav.cta.label}
      <ArrowRight className="arrow size-[18px] max-[359px]:hidden" aria-hidden="true" />
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // pause the running light while the tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    searchBtnRef.current?.focus();
  };

  return (
    <>
      <aside aria-label="Utility bar" data-surface="ink" className="h-[var(--utility-h)] bg-surface text-fg">
        <div className="grid-12 h-full">
          <div className="col-span-12 flex h-full items-center justify-between">
            <p className="t-small hidden text-muted md:block">{utilityBar.note}</p>
            <nav aria-label="Utility" className="ml-auto">
              <ul className="m-0 flex list-none items-center gap-1 p-0 sm:gap-3">
                {utilityBar.links.map((l) => {
                  const Icon = icons[l.icon];
                  const cls = "inline-flex h-[28px] items-center gap-0.5 whitespace-nowrap rounded-pill px-0.5 text-small hover:underline hover:underline-offset-4 sm:px-1";
                  return (
                    <li key={l.id}>
                      {l.action === "search" ? (
                        <button type="button" onClick={() => setSearchOpen(true)} className={cls}>
                          <Icon className="size-[16px]" aria-hidden="true" />
                          {l.label}
                        </button>
                      ) : (
                        <a href={l.href} lang={l.lang} hrefLang={l.lang} className={cls}>
                          <Icon className="size-[16px]" aria-hidden="true" />
                          {l.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      {/* zero-height sticky rail: the pill floats over the page and sticks 20px from the top */}
      <header id="top" className="sticky top-[calc(var(--nav-top)-var(--nav-gap))] z-header h-0">
        <div
          data-surface="ink"
          data-scrolled={scrolled}
          data-paused={paused}
          className="nav-pill absolute inset-x-[var(--nav-inset)] top-[var(--nav-gap)] h-[var(--nav-h)] rounded-pill"
        >
          <div className="flex h-full items-center gap-1 pl-[12px] pr-[12px] lg:gap-2 lg:pl-4 xl:gap-3">
            <a href="#top" aria-label={nav.emblemLabel} className="flex shrink-0 items-center rounded-pill">
              <NavEmblem className="max-lg:w-[36px]" />
            </a>
            <span className="nav-divider max-lg:hidden" aria-hidden="true" />
            <a href="#top" className="font-display text-[18px] font-semibold uppercase tracking-[0.2em] text-white max-lg:hidden xl:tracking-[0.3em]">
              TOYOTA
            </a>

            <NavigationMenu aria-label="Primary" className="hidden flex-1 lg:block" delayDuration={120} skipDelayDuration={300}>
              <NavigationMenuList className="ml-1 gap-0 xl:ml-2">
                {nav.items.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    {item.mega ? (
                      <>
                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                        <MegaMenu />
                      </>
                    ) : (
                      <NavigationMenuLink nav href={item.href} data-active={item.active ? "true" : undefined}>
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-2">
              <button ref={searchBtnRef} type="button" aria-label={nav.search.open} aria-expanded={searchOpen} onClick={() => setSearchOpen(true)} className={circleBtn}>
                <Search className="size-[20px]" aria-hidden="true" />
              </button>

              <div className="hidden items-center gap-2 lg:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    aria-label={`${nav.language.label}: ${lang}`}
                    className="inline-flex h-[44px] items-center gap-1 rounded-pill px-[12px] text-[15px] font-medium text-[var(--nav-link)] transition-colors duration-200 ease-out hover:text-white data-[state=open]:text-white"
                  >
                    <Globe className="size-[18px]" aria-hidden="true" />
                    <span className="max-xl:sr-only">{lang}</span>
                    <ChevronDown className="size-[16px]" aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
                      {nav.language.options.map((o) => (
                        <DropdownMenuRadioItem key={o.code} value={o.code} lang={o.lang}>
                          {o.code} · {o.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span className="nav-divider" aria-hidden="true" />
              </div>

              <span className="hidden lg:contents">
                <BuildPrice />
              </span>
              <span className="contents lg:hidden">
                <BuildPrice compact />
              </span>
              <MobileMenu />
            </div>
          </div>

          {/* inline search: expands inside the bar */}
          <form
            role="search"
            data-open={searchOpen}
            aria-hidden={!searchOpen}
            onSubmit={(e) => e.preventDefault()}
            onKeyDown={(e) => e.key === "Escape" && closeSearch()}
            className="nav-search absolute inset-0 flex items-center gap-2 rounded-pill bg-ink pl-4 pr-[12px]"
            {...(!searchOpen ? { style: { visibility: "hidden" as const, transition: "clip-path 260ms var(--ease-out), visibility 0s linear 260ms" } } : {})}
          >
            <Search className="size-[20px] shrink-0 text-[var(--nav-link)]" aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              tabIndex={searchOpen ? 0 : -1}
              aria-label={nav.search.label}
              placeholder={nav.search.placeholder}
              className="h-full min-w-0 flex-1 bg-transparent text-body text-white placeholder:text-[var(--nav-link)] focus-visible:outline-none"
            />
            <button type="button" tabIndex={searchOpen ? 0 : -1} aria-label={nav.search.close} onClick={closeSearch} className={circleBtn}>
              <X className="size-[20px]" aria-hidden="true" />
            </button>
          </form>

          <NavBeam />
        </div>
      </header>
    </>
  );
}
