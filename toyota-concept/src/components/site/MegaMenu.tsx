import { ArrowRight } from "lucide-react";
import { NavigationMenuContent } from "@/components/ui/navigation-menu";
import { megaMenu, vehicles } from "@/data/content";

const byId = Object.fromEntries(vehicles.map((v) => [v.id, v]));
const count = (id: string) => vehicles.filter((v) => v.categories.includes(id as never)).length;

/** Solid dark dropdown: the six vehicle categories. */
export function MegaMenu() {
  return (
    <NavigationMenuContent>
      <div className="p-4">
        <ul className="m-0 grid list-none grid-cols-3 gap-2 p-0" aria-label={megaMenu.label}>
          {megaMenu.categories.map((c) => {
            const v = byId[c.vehicle];
            return (
              <li key={c.id}>
                <a
                  href="#finder"
                  className="group flex items-center gap-2 rounded-card border border-transparent p-1 transition-colors duration-200 ease-out hover:border-line"
                >
                  <img
                    src={`/images/${v.image}-thumb.webp`}
                    width={96}
                    height={60}
                    alt={v.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-[96px] shrink-0 rounded-[8px] bg-mist"
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="font-medium">{c.label}</span>
                    <span className="t-small text-muted">{count(c.id)} models (concept)</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 border-t border-line pt-3">
          <a
            href={megaMenu.viewAll.href}
            className="inline-flex items-center gap-1 font-medium underline decoration-1 underline-offset-[6px] hover:decoration-2"
          >
            {megaMenu.viewAll.label}
            <ArrowRight className="size-[16px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </NavigationMenuContent>
  );
}
