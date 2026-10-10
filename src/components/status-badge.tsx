"use client";

import { useShopStatus } from "@/lib/use-shop-status";
import { cn } from "@/lib/utils";

/**
 * Live open/closed badge in Los Angeles time. Shows a neutral placeholder
 * (the static hours) until the client has computed the real status.
 */
export function StatusBadge({ variant = "pill", className }: { variant?: "pill" | "inline"; className?: string }) {
  const clock = useShopStatus();
  const color = clock === null ? "#5b6168" : !clock.open ? "#E3262E" : clock.soon ? "#F2C230" : "#2FBF71";
  const progress = clock === null ? 0 : clock.progress;

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
      <ProgressRing color={color} progress={progress} />
      {clock === null ? "Mon–Fri 9 AM – 5 PM" : clock.text}
    </span>
  );
}


/** Circle that fills clockwise as the day's opening hours pass. Closed = full red. */
function ProgressRing({ color, progress }: { color: string; progress: number }) {
  const r = 7;
  const c = 2 * Math.PI * r;
  const filled = Math.max(0, Math.min(1, progress));
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="size-5 shrink-0 -rotate-90">
      <circle cx="10" cy="10" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
      <circle
        cx="10"
        cy="10"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="butt"
        strokeDasharray={`${c * filled} ${c}`}
      />
    </svg>
  );
}
