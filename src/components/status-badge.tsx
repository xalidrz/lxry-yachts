"use client";

import { useShopStatus } from "@/lib/use-shop-status";
import { cn } from "@/lib/utils";

/**
 * Live open/closed badge in Los Angeles time. Shows a neutral placeholder
 * (the static hours) until the client has computed the real status.
 */
export function StatusBadge({ variant = "pill", className }: { variant?: "pill" | "inline"; className?: string }) {
  const clock = useShopStatus();
  const dot = clock === null ? "bg-steel" : clock.open ? "bg-[#2FBF71]" : "bg-signal";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        variant === "pill"
          ? "rounded-full border border-white/15 bg-surface px-4 py-2 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink"
          : "text-sm text-ink/90",
        className,
      )}
      role="status"
    >
      <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", dot)} />
      {clock === null ? "Mon–Fri 9 AM – 5 PM" : clock.text}
    </span>
  );
}

