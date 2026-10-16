import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { compare, type Vehicle } from "@/data/content";

type Props = { items: Vehicle[]; onRemove: (id: string) => void; onClear: () => void };

/** Solid bar that slides up from the bottom once 2–3 vehicles are checked. */
export function CompareTray({ items, onRemove, onClear }: Props) {
  const [open, setOpen] = useState(false);
  const visible = items.length >= compare.min;

  return (
    <>
      <section
        aria-label={compare.label}
        data-open={visible}
        data-surface="ink"
        // on mobile it sits above the sticky "Find a dealer" bar
        className="tray fixed inset-x-0 bottom-[var(--dealerbar-h)] z-tray border-t border-line bg-surface text-fg md:bottom-0"
      >
        <div className="grid-12 py-2">
          <div className="col-span-12 flex flex-wrap items-center gap-2 md:flex-nowrap md:gap-3">
            <ul className="m-0 flex min-w-0 flex-1 list-none gap-2 overflow-x-auto p-0 rail">
              {items.map((v) => (
                <li key={v.id} className="relative shrink-0">
                  <img
                    src={`/images/${v.image}-thumb.webp`}
                    width={96}
                    height={60}
                    alt={v.alt}
                    className="h-auto w-[96px] rounded-[8px] border border-line bg-mist"
                  />
                  <button
                    type="button"
                    aria-label={compare.remove(v.name)}
                    onClick={() => onRemove(v.id)}
                    className="absolute -right-0.5 -top-0.5 inline-flex size-3 items-center justify-center rounded-pill border border-ink bg-white text-ink hover:bg-mist"
                  >
                    <X className="size-[16px]" aria-hidden="true" />
                  </button>
                  <span className="t-small mt-0.5 block max-w-[96px] truncate">{v.name}</span>
                </li>
              ))}
            </ul>
            <p className="t-small text-muted max-md:hidden" role="status" aria-live="polite">
              {compare.status(items.length)}
            </p>
            <div className="flex items-center gap-1 max-md:w-full max-md:justify-between">
              <Button variant="ghost" size="sm" onClick={onClear}>
                {compare.clear}
              </Button>
              <Button onClick={() => setOpen(true)} disabled={items.length < compare.min}>
                {compare.action} ({items.length})
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent closeLabel={compare.close}>
          <DialogTitle>{compare.dialogTitle}</DialogTitle>
          <DialogDescription>{compare.dialogDescription}</DialogDescription>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[160px] p-1">
                    <span className="sr-only">Specification</span>
                  </th>
                  {items.map((v) => (
                    <th key={v.id} scope="col" className="p-1 align-bottom">
                      <img src={`/images/${v.image}-thumb.webp`} width={240} height={150} alt={v.alt} className="mb-1 h-auto w-full max-w-[200px] rounded-[8px] bg-mist" />
                      <span className="headline t-h3 block">{v.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.rows.map((r) => (
                  <tr key={r.key} className="border-t border-line">
                    <th scope="row" className="t-small p-1 font-medium text-muted">
                      {r.label}
                    </th>
                    {items.map((v) => (
                      <td key={v.id} className="p-1">
                        {r.key === "badge" ? v.badge.label : v[r.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
