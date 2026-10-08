import { Phone } from "lucide-react";
import { site, telHref } from "@/lib/site";

/** Floating "Call Now" button — mobile only. */
export function CallButton() {
  return (
    <a
      href={telHref}
      aria-label={`Call now: ${site.phoneDisplay}`}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 items-center gap-2.5 rounded-full bg-volt-gradient pl-5 pr-6 font-label text-base font-semibold uppercase tracking-label text-ink shadow-[0_10px_34px_-6px_rgba(247,147,30,0.8)] transition-transform active:scale-95 md:hidden"
    >
      <span aria-hidden className="absolute inset-0 -z-10 animate-[pulseRing_2.2s_ease-out_infinite] rounded-full bg-volt/60" />
      <Phone className="size-5" />
      Call Now
    </a>
  );
}
