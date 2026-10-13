/** Inline style for the clock needle. Lives in src/lib so Tailwind's class scanner never sees the CSS property names. */
export function needleStyle(deg: number, mode: "none" | "sweep" | "live", origin: number) {
  const motion =
    mode === "none" ? "none" : mode === "sweep" ? "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)" : "transform 1s linear";
  return { transform: `rotate(${deg}deg)`, transformOrigin: `${origin}px ${origin}px`, transition: motion } as const;
}
