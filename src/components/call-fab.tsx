import { Phone } from "lucide-react";
import { PearlButton } from "@/components/ui/pearl-button";
import { links, site } from "@/config/site";

/** Sticky red "Call" pill, mobile only. */
export function CallFab() {
  return (
    <PearlButton
      asChild
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 md:hidden"
    >
      <a href={links.tel} aria-label={`Call ${site.phone.display}`}>
        <Phone className="phone-icon size-5" aria-hidden />
        Call
      </a>
    </PearlButton>
  );
}
