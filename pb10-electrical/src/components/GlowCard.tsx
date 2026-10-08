import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a cursor-following glow, a red top rule that sweeps in and an orange (or warm amber) bloom on hover.
 * `tone="warm"` is the softer, golden version used on the wedding cards.
 */
export function GlowCard({
  children,
  className,
  tone = "volt",
  ...rest
}: { children: ReactNode; tone?: "volt" | "warm" } & HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={onMove}
      className={cn(
        "glow-card group relative h-full overflow-hidden rounded-xl border border-white/10 bg-surface transition-all duration-500 hover:-translate-y-1.5",
        tone === "warm" ? "glow-card-warm hover:border-volt-light/50 hover:shadow-warm-glow" : "hover:border-volt/60 hover:shadow-volt-glow",
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="glow-spot pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span aria-hidden className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-brandred transition-transform duration-500 group-hover:scale-x-100" />
      {children}
    </div>
  );
}
