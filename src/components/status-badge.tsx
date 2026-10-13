"use client";

import { useShopStatus } from "@/lib/use-shop-status";
import { cn } from "@/lib/utils";

/**
 * Live open/closed badge in Los Angeles time. Shows a neutral placeholder
 * until the client has computed the real status.
 */
export function StatusBadge({ className }: { variant?: "inline"; className?: string }) {
  const clock = useShopStatus();
  const color = clock === null ? "#5b6168" : !clock.open ? "#E3262E" : clock.soon ? "#F2C230" : "#2FBF71";
  const progress = clock === null ? 0 : clock.progress;

  return (
    <span className={cn("inline-flex items-center gap-2.5 text-sm text-ink/90", className)} role="status">
      <ProgressRing color={color} progress={progress} />
      {clock === null ? "Checking status…" : clock.text}
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
