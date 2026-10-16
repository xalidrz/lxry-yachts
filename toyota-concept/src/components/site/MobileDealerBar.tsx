import { Button } from "@/components/ui/button";
import { dealerBar } from "@/data/content";
import { icons } from "./icons";

/** Sticky bottom CTA, mobile only. */
export function MobileDealerBar() {
  const Icon = icons[dealerBar.icon];
  return (
    <div data-surface="white" className="fixed inset-x-0 bottom-0 z-dealerbar flex h-[var(--dealerbar-h)] items-center border-t border-line bg-surface px-2 md:hidden">
      <Button asChild className="w-full">
        <a href={dealerBar.href}>
          <Icon aria-hidden="true" />
          {dealerBar.label}
        </a>
      </Button>
    </div>
  );
}
