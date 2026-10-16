import { Menu } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { megaMenu, nav, utilityBar, vehicles } from "@/data/content";
import { Wordmark } from "./Wordmark";

const byId = Object.fromEntries(vehicles.map((v) => [v.id, v]));
const linkCls = "headline flex min-h-7 items-center border-b border-line text-[28px]";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label={nav.menu.open} className="size-[40px] border-[var(--nav-border)] lg:hidden">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent data-surface="ink" closeLabel={nav.menu.close}>
        <div className="flex h-9 items-center px-3">
          <Wordmark />
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav aria-label="Mobile" className="flex flex-1 flex-col px-3 pb-3">
          <Accordion type="single" collapsible>
            <AccordionItem value="vehicles">
              <AccordionTrigger>Vehicles</AccordionTrigger>
              <AccordionContent>
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {megaMenu.categories.map((c) => (
                    <li key={c.id}>
                      <SheetClose asChild>
                        <a href="#finder" className="flex items-center gap-2 py-0.5">
                          <img src={`/images/${byId[c.vehicle].image}-thumb.webp`} width={96} height={60} alt={byId[c.vehicle].alt} loading="lazy" className="h-auto w-[96px] rounded-[8px] bg-mist" />
                          <span className="font-medium">{c.label}</span>
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {nav.items
            .filter((i) => !i.mega)
            .map((i) => (
              <SheetClose asChild key={i.id}>
                <a href={i.href} className={linkCls}>
                  {i.label}
                </a>
              </SheetClose>
            ))}
          <ul className="m-0 mt-3 flex list-none flex-col gap-1 p-0">
            {utilityBar.links
              .filter((l) => l.action !== "search")
              .map((l) => (
                <li key={l.id}>
                  <SheetClose asChild>
                    <a href={l.href} lang={l.lang} className="inline-flex min-h-6 items-center">
                      {l.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
          </ul>
          <SheetClose asChild>
            <Button asChild className="mt-auto w-full">
              <a href={nav.cta.href}>{nav.cta.label}</a>
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
