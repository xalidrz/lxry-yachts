import { useId } from "react";

/** Simple line-art mandala: thin sage strokes only. Purely decorative, hidden from screen readers. */
export function Mandala({ className }: { className?: string }) {
  const id = useId();
  const petalA = `${id}-a`;
  const petalB = `${id}-b`;
  const rotations = (count: number, offset = 0) => Array.from({ length: count }, (_, i) => offset + (360 / count) * i);

  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <path id={petalA} d="M0 -17 C7 -26 7 -37 0 -47 C-7 -37 -7 -26 0 -17Z" vectorEffect="non-scaling-stroke" />
        <path id={petalB} d="M0 -52 C11 -66 11 -82 0 -97 C-11 -82 -11 -66 0 -52Z" vectorEffect="non-scaling-stroke" />
      </defs>
      <circle r="6" vectorEffect="non-scaling-stroke" />
      <circle r="12" vectorEffect="non-scaling-stroke" />
      <circle r="49.5" strokeDasharray="0.1 3.2" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      {rotations(12).map((r) => (
        <use key={`a${r}`} href={`#${petalA}`} transform={`rotate(${r})`} />
      ))}
      {rotations(12, 15).map((r) => (
        <use key={`b${r}`} href={`#${petalB}`} transform={`rotate(${r})`} />
      ))}
      {rotations(12).map((r) => (
        <circle key={`d${r}`} cx="0" cy="-57" r="1" transform={`rotate(${r})`} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
