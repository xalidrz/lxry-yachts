import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { InquiryDialog } from "@/components/vehicles/InquiryDialog";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { Vehicle } from "@/data/vehicles";
import { useI18n } from "@/i18n";
import { useMotionOk } from "@/lib/motion";
import { ALL, activeCount, defaultFilters, filtersFromParams, matches, paramsFromFilters, pickFeatured, sortKeys, sortVehicles, type Filters, type SortKey } from "@/lib/inventory";

const PAGE_SIZE = 12;

interface Props {
  /** Use the Harley-Davidson texts and pre-applied filter */
  variant?: "all" | "harley";
  /** Pre-applied, e.g. Harley-Davidson */
  preset?: Partial<Filters>;
}

export default function InventoryPage({ variant = "all", preset }: Props) {
  const { t } = useI18n();
  const ok = useMotionOk();
  const copy = variant === "harley" ? t.inventory.harley : t.inventory;
  usePageMeta(variant === "harley" ? t.meta.harley.title : t.meta.inventory.title, variant === "harley" ? t.meta.harley.desc : t.meta.inventory.desc);
  const [params, setParams] = useSearchParams();
  const { filters, sort } = useMemo(() => filtersFromParams(params, preset), [params, preset]);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [inquiry, setInquiry] = useState<Vehicle | null>(null);

  const update = (next: Filters, nextSort: SortKey = sort) => {
    setParams(paramsFromFilters(next, nextSort, preset), { replace: true });
    setLimit(PAGE_SIZE);
  };

  const results = useMemo(() => sortVehicles(ALL.filter((v) => matches(v, filters)), sort), [filters, sort]);
  const shown = results.slice(0, limit);
  const count = activeCount(filters) - (preset?.makes?.length ?? 0);
  const eyebrow = "eyebrow" in copy ? copy.eyebrow : t.inventory.eyebrow;

  return (
    <>
      <section className="on-dark bg-ink text-white">
        <div className="container py-12 md:py-16">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-2 mt-4" translate={variant === "harley" ? "no" : undefined}>{copy.title}</h1>
          <p className="mt-4 max-w-xl text-white/85">{copy.lead}</p>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          {/* One scroll area only: the sidebar flows with the page; long lists collapse behind "Mehr anzeigen". */}
          <aside className="hidden lg:block" aria-label={t.inventory.filterAria}>
            <VehicleFilters filters={filters} onChange={update} />
          </aside>

          <section aria-label={t.inventory.results}>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
              <h2 className="font-sans text-base font-semibold" aria-live="polite">
                {t.inventory.found(results.length)}
              </h2>
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal aria-hidden /> {t.inventory.filter}{count > 0 && ` (${count})`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="gap-0 overflow-y-auto p-6" closeLabel={t.header.close}>
                    <SheetTitle className="sr-only">{t.inventory.filter}</SheetTitle>
                    <SheetDescription className="sr-only">{t.inventory.sheetDesc}</SheetDescription>
                    <VehicleFilters filters={filters} onChange={update} className="flex-1 pb-6" />
                    <div className="sticky bottom-0 -mx-6 -mb-6 shrink-0 border-t border-line bg-paper p-4">
                      <SheetClose asChild>
                        <Button variant="brand" size="lg" className="w-full">
                          {t.inventory.showResults(results.length)}
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetContent>
                </Sheet>

                <label className="sr-only" id="sort-label">{t.inventory.sort}</label>
                <Select value={sort} onValueChange={(v) => update(filters, v as SortKey)}>
                  <SelectTrigger aria-labelledby="sort-label" className="h-10 w-[15rem] max-w-[60vw]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {sortKeys.map((k) => (
                      <SelectItem key={k} value={k}>
                        {t.inventory.sorts[k]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {results.length > 0 ? (
              <>
                <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {/* Cards re-order with a layout animation when filters or sorting change */}
                  <AnimatePresence mode="popLayout" initial={false}>
                    {shown.map((v, i) => (
                      <motion.li
                        key={v.id}
                        layout={ok}
                        initial={ok ? { opacity: 0, scale: 0.97 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={ok ? { opacity: 0, scale: 0.97 } : undefined}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <VehicleCard vehicle={v} onInquire={setInquiry} priority={i < 3} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                {shown.length < results.length && (
                  <div className="mt-12 flex flex-col items-center gap-3">
                    <p className="text-sm text-grey">{t.inventory.countOf(shown.length, results.length)}</p>
                    <Button variant="outline" size="lg" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
                      {t.inventory.showMore}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <NoMatches onReset={() => update({ ...defaultFilters(), ...preset })} onInquire={setInquiry} />
            )}
          </section>
        </div>
      </div>

      <InquiryDialog vehicle={inquiry} onClose={() => setInquiry(null)} />
    </>
  );
}

/** Filters too narrow: say so kindly, offer a reset and the weekly highlights — never a dead end. */
function NoMatches({ onReset, onInquire }: { onReset: () => void; onInquire: (v: Vehicle) => void }) {
  const { t } = useI18n();
  return (
    <div>
      <div className="rounded-lg border border-line bg-white p-8 text-center md:p-12">
        <h3 className="font-display text-2xl font-bold">{t.inventory.noMatch}</h3>
        <p className="mx-auto mt-3 max-w-md text-grey">{t.inventory.noMatchLead}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={onReset}>{t.inventory.resetFilters}</Button>
          <Button asChild variant="outline">
            <Link to="/kontakt?betreff=Suchanfrage">{t.inventory.wish}</Link>
          </Button>
        </div>
      </div>
      <h3 className="mb-6 mt-12 font-display text-xl font-bold">{t.inventory.alike}</h3>
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {pickFeatured(3).map((v) => (
          <li key={v.id}>
            <VehicleCard vehicle={v} onInquire={onInquire} />
          </li>
        ))}
      </ul>
    </div>
  );
}
