"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, openBadgeText } from "@/lib/hours";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Live status badge, computed in America/Los_Angeles time after mount so the static HTML is never stale. */
export function OpenBadge({ className }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(getOpenStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-surface px-4 py-2 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink",
        className,
      )}
      aria-live="polite"
    >
      <span
        aria-hidden
        className={cn("size-2.5 rounded-full", open ? "bg-ink ring-2 ring-signal" : "bg-steel ring-2 ring-white/20")}
      />
      {open === null ? `Closes ${site.hours.closesLabel}` : openBadgeText(open)}
    </span>
  );
}
