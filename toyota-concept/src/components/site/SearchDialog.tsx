import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchDialog } from "@/data/content";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent closeLabel="Close search" className="max-w-[640px]">
        <DialogTitle>{searchDialog.title}</DialogTitle>
        <DialogDescription className="sr-only">Search the site. Popular searches are listed below.</DialogDescription>
        <form role="search" className="relative mt-3" onSubmit={(e) => e.preventDefault()}>
          <Search aria-hidden="true" className="pointer-events-none absolute left-2 top-1/2 size-[20px] -translate-y-1/2 text-steel" />
          <Input type="search" aria-label={searchDialog.title} placeholder={searchDialog.placeholder} className="pl-6" autoFocus />
        </form>
        <p className="t-eyebrow mt-4 text-muted">{searchDialog.popularLabel}</p>
        <ul className="mt-1 flex flex-wrap gap-1">
          {searchDialog.popular.map((p) => (
            <li key={p}>
              <a href="#" className="inline-flex h-5 items-center rounded-pill border border-line px-2 text-small hover:border-ink">
                {p}
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
