/**
 * SVG overlay: static 1px border + a red running light that travels the full perimeter at a constant speed.
 * pathLength=100 normalises the rect so dash maths is independent of bar width.
 * The head fades from red to white using four stacked dashes (a stroke gradient would follow page x, not the beam).
 * Only stroke-dashoffset is animated. Glow is a wider, fainter stroke (no filters).
 */
const rectStyle = { width: "calc(100% - 1px)", height: "calc(100% - 1px)" } as const;
const common = { x: 0.5, y: 0.5, rx: 32, pathLength: 100 } as const;

const LAYERS = [
  { len: 14, stroke: "var(--red)", w: 2, o: 0.35, k: "beam-0" },
  { len: 9, stroke: "var(--red-hi)", w: 2, o: 0.7, k: "beam-1" },
  { len: 5, stroke: "var(--red-hi)", w: 2, o: 1, k: "beam-2" },
  { len: 1.6, stroke: "var(--white)", w: 2, o: 1, k: "beam-3" },
];

export function NavBeam() {
  return (
    <>
      <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <rect {...common} style={rectStyle} fill="none" stroke="var(--nav-border)" strokeWidth="1" />
        <rect
          {...common}
          style={{ ...rectStyle, animationName: "beam-0" }}
          className="beam"
          stroke="var(--red)"
          strokeWidth="6"
          opacity="0.25"
          strokeDasharray="14 86"
        />
        {LAYERS.map((l) => (
          <rect
            key={l.k}
            {...common}
            style={{ ...rectStyle, animationName: l.k }}
            className="beam"
            stroke={l.stroke}
            strokeWidth={l.w}
            opacity={l.o}
            strokeDasharray={`${l.len} ${100 - l.len}`}
          />
        ))}
      </svg>
      {/* static mark, always visible (also the only thing left under reduced motion) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[-1px] top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-pill bg-red"
        style={{ boxShadow: "0 0 8px -2px var(--red)" }}
      />
    </>
  );
}
