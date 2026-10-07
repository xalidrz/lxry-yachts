"use client";

import { Minus, Plus } from "lucide-react";

import { MAX_QTY } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

/** − 1 + control. The number can also be typed. */
export function QtyStepper({
  value,
  onChange,
  decreaseLabel,
  increaseLabel,
  qtyLabel,
  size = "md",
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  decreaseLabel: string;
  increaseLabel: string;
  qtyLabel: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const btn = cn(
    "flex shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-150 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40",
    size === "sm" ? "size-9" : "size-11",
  );
  const clamp = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.floor(n) || 1));

  return (
    <div
      className={cn("inline-flex items-center rounded-full border bg-white", className)}
      dir="ltr"
    >
      <button
        type="button"
        className={btn}
        aria-label={decreaseLabel}
        disabled={value <= 1}
        onClick={() => onChange(clamp(value - 1))}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={qtyLabel}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value.replace(/\D/g, ""))))}
        className={cn(
          "bg-transparent text-center font-semibold tabular-nums outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-brand",
          size === "sm" ? "w-8 text-sm" : "w-10 text-base",
        )}
      />
      <button
        type="button"
        className={btn}
        aria-label={increaseLabel}
        disabled={value >= MAX_QTY}
        onClick={() => onChange(clamp(value + 1))}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
