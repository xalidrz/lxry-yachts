import { cn } from "@/lib/utils";

/**
 * Text wordmark, kept as one self-contained SVG so a real logo can replace it
 * by editing this file only. Widths are fixed with textLength so the red bar
 * always sits exactly under "ELITE".
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 196 30"
      role="img"
      aria-label="Elite Motorsports"
      className={cn("h-6 w-auto text-ink", className)}
      fill="currentColor"
    >
      <g
        style={{ fontFamily: "var(--font-barlow), 'Arial Narrow', sans-serif", fontWeight: 800 }}
        fontSize="25"
        letterSpacing="0.5"
      >
        <text x="0" y="22" textLength="54" lengthAdjust="spacingAndGlyphs">ELITE</text>
        <text x="62" y="22" textLength="134" lengthAdjust="spacingAndGlyphs">MOTORSPORTS</text>
      </g>
      <rect x="0" y="26" width="54" height="2.5" fill="#E3262E" />
    </svg>
  );
}
