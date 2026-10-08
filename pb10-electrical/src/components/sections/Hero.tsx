import { useCallback, useState, type PointerEvent as ReactPointerEvent } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, Zap } from "lucide-react";
import { BoltIntro } from "@/components/BoltIntro";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Side = "electrical" | "wedding";

/** Right-angle circuit traces drawn over the electrical half (decorative). */
const traces = [
  "M0 470H90V400H210V330H320",
  "M0 540H140V600H260V520H400",
  "M60 0V120H170V210H300V150H400",
  "M400 280H350V360H250V430",
];
const nodes: [number, number][] = [[320, 330], [400, 520], [300, 150], [250, 430], [90, 400], [140, 600]];

/** Strings of fairy lights draped across the top of the wedding half. */
const strings = [
  { p0: [-20, -10], p1: [620, 30], sag: 70, n: 14 },
  { p0: [-20, 40], p1: [620, 0], sag: 52, n: 12 },
];
const bulbs = strings.flatMap((s, si) => {
  const c = [(s.p0[0] + s.p1[0]) / 2, (s.p0[1] + s.p1[1]) / 2 + s.sag * 2];
  return Array.from({ length: s.n }, (_, i) => {
    const t = (i + 0.5) / s.n;
    return {
      x: (1 - t) ** 2 * s.p0[0] + 2 * (1 - t) * t * c[0] + t ** 2 * s.p1[0],
      y: (1 - t) ** 2 * s.p0[1] + 2 * (1 - t) * t * c[1] + t ** 2 * s.p1[1] + 5,
      d: (si * 7 + i * 3) % 11,
    };
  });
});

interface PanelProps {
  id: Side;
  active: Side | null;
  lit: boolean;
  setActive: (s: Side | null) => void;
  reduce: boolean;
}

function Panel({ id, active, lit, setActive, reduce }: PanelProps) {
  const electrical = id === "electrical";
  const isActive = active === id;
  const dimmed = active !== null && !isActive;

  const mouse = (side: Side | null) => (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") setActive(side);
  };

  return (
    <m.div
      role="group"
      aria-label={electrical ? "Electrical Services" : "Wedding Lighting Decor"}
      className="relative min-h-0 min-w-0 flex-1 basis-0 cursor-pointer"
      initial={false}
      animate={{ flexGrow: isActive ? 1.85 : 1 }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      onPointerEnter={mouse(id)}
      onPointerLeave={mouse(null)}
      onFocus={() => setActive(id)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
      }}
      onClick={() => setActive(id)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={electrical ? "/photos/electrical-feature-wall.webp" : "/photos/wedding-entrance-decor.webp"}
          alt=""
          fetchPriority="high"
          decoding="async"
          className={cn("absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out", electrical ? "object-[50%_30%] [filter:contrast(1.1)_saturate(1.15)_brightness(1.05)]" : "object-[42%_50%]", isActive ? "scale-[1.08]" : "scale-100")}
        />
        {/* legibility gradients */}
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink/70 to-transparent" />
        {!electrical && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(255,182,39,0.22),transparent_65%)]" />}

        {electrical ? (
          <svg aria-hidden viewBox="0 0 400 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full opacity-60">
            {traces.map((d, i) => (
              <m.path
                key={d}
                d={d}
                fill="none"
                stroke="#F7931E"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 0.7 : 0 }}
                transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.2 + i * 0.18, ease: "easeOut" }}
              />
            ))}
            {nodes.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={3.2} fill="#FFB627" className="twinkle" style={{ opacity: lit ? 1 : 0, transition: "opacity .6s", transitionDelay: `${0.8 + i * 0.12}s`, animationDelay: `${i * 0.4}s` }} />
            ))}
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 600 200" preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-0 h-1/2 w-full">
            {strings.map((s, i) => {
              const c = [(s.p0[0] + s.p1[0]) / 2, (s.p0[1] + s.p1[1]) / 2 + s.sag * 2];
              return <path key={i} d={`M${s.p0[0]},${s.p0[1]}Q${c[0]},${c[1]} ${s.p1[0]},${s.p1[1]}`} fill="none" stroke="#3a2f24" strokeWidth={1.4} />;
            })}
            {bulbs.map((b, i) => (
              <g key={i} style={{ opacity: lit ? 1 : 0, transition: "opacity .45s", transitionDelay: `${reduce ? 0 : 0.35 + i * 0.05}s` }}>
                <circle cx={b.x} cy={b.y} r={11} fill="#FFB627" opacity={0.28} />
                <circle cx={b.x} cy={b.y} r={3.2} fill="#FFF3D1" className="twinkle" style={{ animationDelay: `${b.d * 0.3}s`, transformOrigin: `${b.x}px ${b.y}px` }} />
              </g>
            ))}
          </svg>
        )}

        {/* "lights off" veil: flickers away when the lightning strikes */}
        <m.div
          aria-hidden
          className="absolute inset-0 bg-ink"
          initial={reduce ? false : { opacity: 0.9 }}
          animate={lit ? { opacity: [0.9, 0.12, 0.7, 0.05, 0.4, 0] } : { opacity: 0.9 }}
          transition={{ duration: reduce ? 0 : 1.15, times: [0, 0.12, 0.3, 0.45, 0.62, 1], delay: electrical ? 0 : 0.12 }}
        />
        {/* dims the half that is not hovered */}
        <div className={cn("absolute inset-0 bg-black transition-opacity duration-700", dimmed ? "opacity-45" : "opacity-0")} />
      </div>

      <div className={cn("absolute inset-x-0 bottom-0 z-10 px-6 pb-8 transition-opacity duration-500 md:px-10 md:pb-14 lg:px-14", dimmed && "opacity-70")}>
        <div className={cn("mx-auto max-w-md md:mx-0", electrical ? "md:ml-auto md:mr-0 md:text-right" : "")}>
          <p className={cn("label flex items-center gap-3 text-[0.82rem] text-volt-light", electrical && "md:flex-row-reverse")}>
            <span aria-hidden className="h-px w-8 bg-brandred" />
            {electrical ? "Edmonton electrician" : "Weddings & festivals"}
          </p>
          <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.8rem)]">{electrical ? "Electrical Services" : "Wedding Lighting Decor"}</h2>
          <p className="mt-3 text-[0.97rem] text-white/75">
            {electrical
              ? "Wiring, panel upgrades, EV chargers and renovations — done right, priced fairly."
              : "Full house lighting, entrance decor and fairy-light canopies that make the night unforgettable."}
          </p>
          <Button asChild variant={electrical ? "outline" : "volt"} className={cn("mt-6", electrical && "md:ml-auto")}>
            <a href={electrical ? "#electrical" : "#wedding"}>
              {electrical ? "Explore Electrical" : "Explore Lighting Decor"} <ArrowRight />
            </a>
          </Button>
        </div>
      </div>

      {/* seam: red hairline + bolt badge between the halves */}
      {electrical && (
        <>
          <span aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-brandred to-transparent md:inset-x-auto md:inset-y-0 md:right-0 md:h-auto md:w-px md:bg-gradient-to-b" />
          <span
            aria-hidden
            className="absolute bottom-0 left-1/2 z-30 grid size-11 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border border-volt/70 bg-ink text-volt-light shadow-[0_0_30px_rgba(247,147,30,0.6)] md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-1/2"
          >
            <Zap className="size-5" fill="currentColor" />
          </span>
        </>
      )}
    </m.div>
  );
}

export function Hero() {
  const reduce = !!useReducedMotion();
  const [lit, setLit] = useState(reduce);
  const [intro, setIntro] = useState(!reduce);
  const [active, setActive] = useState<Side | null>(null);
  const strike = useCallback(() => setLit(true), []);
  const done = useCallback(() => setIntro(false), []);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink md:h-[100svh] md:min-h-[720px]">
      {intro && <BoltIntro onStrike={strike} onDone={done} />}

      <div className="pointer-events-none relative z-20 px-5 pb-8 pt-24 text-center md:absolute md:inset-x-0 md:top-0 md:bg-gradient-to-b md:from-ink/85 md:via-ink/45 md:to-transparent md:pb-24 md:pt-28">
        <p className="label flex items-center justify-center gap-3 text-[0.85rem] text-white/80">
          <span aria-hidden className="h-px w-8 bg-brandred" />
          Edmonton, Alberta
          <span aria-hidden className="h-px w-8 bg-brandred" />
        </p>
        <h1 id="hero-title" className="mx-auto mt-4 max-w-6xl text-[clamp(1.9rem,4.5vw,4rem)] leading-[1.08]">
          We{" "}
          <span className={cn("text-volt-gradient transition-[filter] duration-1000", lit ? "[filter:drop-shadow(0_0_16px_rgba(247,147,30,0.55))]" : "[filter:none]")}>wire</span> your home.
          <br className="hidden sm:block" /> We{" "}
          <span className={cn("text-volt-gradient transition-[filter] duration-1000", lit ? "[filter:drop-shadow(0_0_16px_rgba(247,147,30,0.55))]" : "[filter:none]")}>light up</span> your celebrations.
        </h1>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-sm text-white/85 backdrop-blur-sm">
          <Star className="size-4 fill-volt-light text-volt-light" />
          <span className="font-semibold">{site.rating}</span> on Google
        </p>
      </div>

      <div className="flex h-[88svh] min-h-[620px] flex-col md:absolute md:inset-0 md:h-full md:min-h-0 md:flex-row">
        <Panel id="electrical" active={active} lit={lit} setActive={setActive} reduce={reduce} />
        <Panel id="wedding" active={active} lit={lit} setActive={setActive} reduce={reduce} />
      </div>
    </section>
  );
}
