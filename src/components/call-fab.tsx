import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { links, site } from "@/config/site";

/** Sticky red "Call" pill, mobile only. */
export function CallFab() {
  return (
    <Button
      asChild
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 h-14 px-7 text-lg shadow-[0_8px_22px_rgba(0,0,0,0.5)] md:hidden"
    >
      <a href={links.tel} aria-label={`Call ${site.phone.display}`}>
        <Phone className="phone-icon size-5" aria-hidden />
        Call
      </a>
    </Button>
  );
}
