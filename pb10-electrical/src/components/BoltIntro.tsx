import { useEffect } from "react";
import { m } from "framer-motion";

/**
 * One-off page-load effect: a lightning bolt strikes across the screen with a flash, then the hero lights
 * switch on (the Hero listens for `onStrike`). Purely decorative and non-blocking (pointer-events: none).
 */
export function BoltIntro({ onStrike, onDone }: { onStrike: () => void; onDone: () => void }) {
  useEffect(() => {
    const strike = setTimeout(onStrike, 520);
    const done = setTimeout(onDone, 1900);
    return () => {
      clearTimeout(strike);
      clearTimeout(done);
    };
  }, [onStrike, onDone]);

  const main = "M78,-4 L62,20 L70,22 L48,46 L57,48 L34,74 L42,76 L22,104";
  const branch = "M57,48 L74,60 L69,62 L84,80";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <m.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 60% 35%, rgba(255,230,160,0.95), rgba(247,147,30,0.55) 38%, rgba(18,18,18,0) 72%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.95, 0.12, 0.6, 0] }}
        transition={{ duration: 1.35, times: [0, 0.14, 0.24, 0.4, 0.5, 1], ease: "easeOut" }}
      />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" style={{ filter: "drop-shadow(0 0 10px #F7931E) drop-shadow(0 0 28px #FFB627)" }}>
        {[main, branch].map((d, i) => (
          <g key={d}>
            <m.path
              d={d}
              fill="none"
              stroke="#F7931E"
              strokeWidth={i === 0 ? 14 : 9}
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: [1, 1, 1, 0] }}
              transition={{ pathLength: { duration: 0.26, delay: 0.14 + i * 0.12, ease: "easeIn" }, opacity: { duration: 0.95, delay: 0.14, times: [0, 0.4, 0.62, 1] } }}
            />
            <m.path
              d={d}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={i === 0 ? 4 : 3}
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: [1, 1, 1, 0] }}
              transition={{ pathLength: { duration: 0.26, delay: 0.14 + i * 0.12, ease: "easeIn" }, opacity: { duration: 0.95, delay: 0.14, times: [0, 0.4, 0.62, 1] } }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
