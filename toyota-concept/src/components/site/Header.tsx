import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { nav, utilityBar } from "@/data/content";
import { icons } from "./icons";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { SearchDialog } from "./SearchDialog";
import { Wordmark } from "./Wordmark";

/**
 * One sticky <header>. top is -utility-h so the slim utility bar scrolls away
 * while the solid white navbar stays pinned.
 */
export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header id="top" className="sticky top-[calc(var(--utility-h)*-1)] z-header" data-surface="white">
      <div data-surface="ink" className="h-[var(--utility-h)] bg-surface text-fg">
        <div className="grid-12 h-full">
          <div className="col-span-12 flex h-full items-center justify-between">
            <p className="t-small hidden text-muted md:block">{utilityBar.note}</p>
            <nav aria-label="Utility" className="ml-auto">
              <ul className="m-0 flex list-none items-center gap-1 p-0 sm:gap-3">
                {utilityBar.links.map((l) => {
                  const Icon = icons[l.icon];
                  const cls = "inline-flex h-[28px] items-center gap-0.5 whitespace-nowrap rounded-pill px-0.5 text-small sm:px-1 hover:underline hover:underline-offset-4";
                  return (
                    <li key={l.id}>
                      {l.action === "search" ? (
                        <button type="button" onClick={() => setSearchOpen(true)} className={cls} aria-haspopup="dialog">
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
      </div>

      <div className="h-[var(--nav-h)] border-b border-line bg-surface text-fg">
        <div className="grid-12 h-full">
          <div className="col-span-12 flex h-full items-center gap-4">
            <Wordmark />
            <NavigationMenu aria-label="Primary" className="hidden flex-1 lg:block" delayDuration={120} skipDelayDuration={300}>
              <NavigationMenuList>
                {nav.items.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    {item.mega ? (
                      <>
                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                        <MegaMenu />
                      </>
                    ) : (
                      <NavigationMenuLink nav href={item.href}>
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="ml-auto flex items-center gap-1 lg:ml-0">
              <Button asChild className="hidden sm:inline-flex">
                <a href={nav.cta.href}>
                  {nav.cta.label}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <MobileMenu onSearch={() => setSearchOpen(true)} />
            </div>
          </div>
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
