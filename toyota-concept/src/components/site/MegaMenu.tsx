import { ArrowRight } from "lucide-react";
import { NavigationMenuContent } from "@/components/ui/navigation-menu";
import { megaMenu, vehicles } from "@/data/content";

const byId = Object.fromEntries(vehicles.map((v) => [v.id, v]));

/** Solid white panel, four category columns, small thumbnails. */
export function MegaMenu() {
  return (
    <NavigationMenuContent>
      <div className="grid-12 py-5">
        <div className="col-span-12 grid grid-cols-4 gap-3">
          {megaMenu.columns.map((col) => (
            <div key={col.title}>
              <p className="t-eyebrow border-b border-line pb-1 text-muted">{col.title}</p>
              <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
                {col.vehicles.map((id) => {
                  const v = byId[id];
                  return (
                    <li key={id}>
                      <a href="#finder" className="group flex items-center gap-2 rounded-card border border-transparent p-1 hover:border-line">
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
                          <span className="font-medium">{v.name}</span>
                          <span className="t-small text-muted">{v.price}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="col-span-12 mt-4 flex items-center gap-4 border-t border-line pt-3">
          {[megaMenu.viewAll, megaMenu.compare].map((l) => (
            <a key={l.label} href={l.href} className="inline-flex items-center gap-1 font-medium underline decoration-1 underline-offset-[6px] hover:decoration-2">
              {l.label}
              <ArrowRight className="size-[16px]" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </NavigationMenuContent>
  );
}
