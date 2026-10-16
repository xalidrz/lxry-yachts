import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { megaMenu, nav, utilityBar, vehicles } from "@/data/content";
import { Wordmark } from "./Wordmark";

const byId = Object.fromEntries(vehicles.map((v) => [v.id, v]));
const linkCls = "headline flex min-h-7 items-center border-b border-line text-[28px]";

export function MobileMenu({ onSearch }: { onSearch: () => void }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu" className="lg:hidden">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent>
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
                {megaMenu.columns.map((col) => (
                  <div key={col.title} className="mb-2">
                    <p className="t-eyebrow text-muted">{col.title}</p>
                    <ul className="m-0 mt-1 flex list-none flex-col gap-1 p-0">
                      {col.vehicles.map((id) => (
                        <li key={id}>
                          <SheetClose asChild>
                            <a href="#finder" className="flex items-center gap-2 py-0.5">
                              <img src={`/images/${byId[id].image}-thumb.webp`} width={96} height={60} alt={byId[id].alt} loading="lazy" className="h-auto w-[96px] rounded-[8px] bg-mist" />
                              <span className="font-medium">{byId[id].name}</span>
                            </a>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
            {utilityBar.links.map((l) => (
              <li key={l.id}>
                {l.action === "search" ? (
                  <SheetClose asChild>
                    <button type="button" onClick={onSearch} className="inline-flex min-h-6 items-center">
                      {l.label}
                    </button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <a href={l.href} lang={l.lang} className="inline-flex min-h-6 items-center">
                      {l.label}
                    </a>
                  </SheetClose>
                )}
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
