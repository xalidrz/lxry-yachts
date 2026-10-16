import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { finder, vehicles, type VehicleCategory } from "@/data/content";
import { demoState } from "@/lib/demo-state";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { VehicleCard } from "./VehicleCard";

type Props = { selected: string[]; max: number; onToggle: (id: string) => void };
type Filter = "all" | VehicleCategory;

const itemCls = "basis-[78%] sm:basis-[calc((100%-var(--gutter))/2)] lg:basis-[calc((100%-var(--gutter)*2)/3)] xl:basis-[calc((100%-var(--gutter)*3)/4)]";

export function VehicleFinder({ selected, max, onToggle }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const list = useMemo(() => {
    if (demoState === "empty") return [];
    return filter === "all" ? vehicles : vehicles.filter((v) => v.categories.includes(filter));
  }, [filter]);
  const atLimit = selected.length >= max;
  const hasRail = demoState !== "loading" && list.length > 0;

  return (
    <section id="finder" aria-labelledby="finder-title" className="section" data-surface="paper">
      <Carousel>
      <div className="grid-12">
        <Reveal className="col-span-12 flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <SectionHead id="finder-title" eyebrow={finder.eyebrow} title={finder.title} lead={finder.lead} />
            {hasRail && (
              <div className="hidden gap-1 md:flex">
                <CarouselPrevious label={finder.prev} />
                <CarouselNext label={finder.next} />
              </div>
            )}
          </div>

          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(v) => v && setFilter(v as Filter)}
            aria-label={finder.filterLabel}
            className="rail -mx-3 overflow-x-auto px-3 py-0.5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
          >
            {finder.filters.map((f) => (
              <ToggleGroupItem key={f.id} value={f.id}>
                {f.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <p className="t-small text-muted" role="status" aria-live="polite">
            {finder.count(list.length)}
            {selected.length === 1 && ` · ${finder.selectMore}`}
          </p>
        </Reveal>

        <Reveal className="col-span-12 mt-3">
          {demoState === "loading" ? (
            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading vehicles">
              {[0, 1, 2].map((i) => (
                <li key={i}>
                  <Skeleton className="aspect-[4/5]" />
                </li>
              ))}
            </ul>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-card border border-dashed border-steel bg-white px-3 py-9 text-center">
              <SearchX className="size-[32px]" aria-hidden="true" />
              <h3 className="headline t-h3">{finder.empty.title}</h3>
              <p className="t-body text-muted">{finder.empty.body}</p>
              <Button variant="outline" onClick={() => setFilter("all")}>
                {finder.empty.action}
              </Button>
            </div>
          ) : (
            <>
              <CarouselContent label={finder.carouselLabel} resetKey={filter}>
                {list.map((v) => {
                  const checked = selected.includes(v.id);
                  return (
                    <CarouselItem key={v.id} className={itemCls}>
                      <VehicleCard vehicle={v} checked={checked} disabled={atLimit && !checked} onToggle={onToggle} />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="mt-3 flex gap-1 md:hidden">
                <CarouselPrevious label={finder.prev} />
                <CarouselNext label={finder.next} />
              </div>
            </>
          )}
        </Reveal>
      </div>
      </Carousel>
    </section>
  );
}
