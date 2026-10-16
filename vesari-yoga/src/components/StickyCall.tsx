import { Phone } from "lucide-react";
import { links, site } from "@/content";
import { Button } from "@/components/ui/button";

/** Always-visible call button at the bottom of the screen, on mobile only. */
export function StickyCall() {
  return (
    <div
      data-tone="dark"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-espresso p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <Button asChild size="lg" className="w-full">
        <a href={links.tel} aria-label={`Appeler le ${site.phoneDisplay}`}>
          <Phone aria-hidden="true" strokeWidth={1.5} />
          Appeler
        </a>
      </Button>
    </div>
  );
}
