import { Link } from "react-router-dom";
import { motion, type MotionProps } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/GlowButton";
import { QuickSearch } from "@/components/sections/QuickSearch";
import { site } from "@/data/site";
import { useI18n } from "@/i18n";
import { CountUp, useMotionOk } from "@/lib/motion";

const LINE_STAGGER = 0.06;
const hidden = { clipPath: "inset(0 0 100% 0)", y: 28 };
const shown = { clipPath: "inset(-20% -2% -20% -2%)", y: 0 };

/** One headline line, revealed through a clip-path mask. */
function Line({ children, index }: { children: React.ReactNode; index: number }) {
  const ok = useMotionOk();
  return (
    <motion.span
      className="block"
      {...(ok ? { initial: hidden, animate: shown, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * LINE_STAGGER } } : {})}
    >
      {children}
    </motion.span>
  );
}

export function Hero() {
  const { t, fmt } = useI18n();
  const ok = useMotionOk();
  const rise = (delay: number): MotionProps => (ok ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut", delay } } : {});

  const trust = [
    { node: <CountUp to={site.rating.value} format={(n) => `${fmt.decimal(n)}/${site.rating.outOf}`} />, label: t.hero.stars, stars: true },
    { node: <CountUp to={site.rating.count} format={fmt.int} />, label: t.hero.reviews },
    { node: <CountUp to={site.customers} format={(n) => `${fmt.int(Math.round(n))}+`} />, label: t.hero.customers },
    { node: (<><span>{t.hero.since}</span>&nbsp;<CountUp to={site.since} format={(n) => String(Math.round(n))} /></>), label: t.hero.experience },
  ];

  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white" aria-labelledby="hero-title">
      <img
        src="/images/hero-car.webp"
        alt=""
        width={2000}
        height={668}
        fetchPriority="high"
        className="kenburns absolute inset-0 -z-20 size-full object-cover object-[62%_center]"
      />
      {/* Solid gradients only — no blur or filters. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#05080f]/90 via-[#05080f]/55 to-transparent md:via-[#05080f]/35" aria-hidden />
      {/* Low mist along the ground, built from soft radial gradients */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5"
        style={{ background: "radial-gradient(ellipse 55% 60% at 18% 100%, rgb(214 220 232 / 0.38), transparent 70%), radial-gradient(ellipse 45% 50% at 62% 100%, rgb(214 220 232 / 0.3), transparent 70%), radial-gradient(ellipse 40% 55% at 96% 100%, rgb(230 234 242 / 0.4), transparent 72%)" }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-gradient-to-t from-ink to-transparent" aria-hidden />

      <div className="container flex flex-col justify-center pb-10 pt-16 md:pb-14 md:pt-24">
        <p className="eyebrow">{t.hero.eyebrow(site.since)}</p>
        <h1 id="hero-title" className="display-1 mt-5 max-w-4xl">
          <Line index={0}>{t.hero.line1}</Line>
          <Line index={1}>{t.hero.line2(site.since)}</Line>
        </h1>
        <motion.p {...rise(0.45)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
          {t.hero.lead}
        </motion.p>
        <motion.div {...rise(0.6)} className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <GlowButton>
            <Link to="/fahrzeuge">{t.hero.ctaCars}</Link>
          </GlowButton>
          <Button asChild variant="line">
            <Link to="/ankauf">
              {t.hero.ctaSell} <ArrowRight aria-hidden />
            </Link>
          </Button>
        </motion.div>
        <motion.div {...rise(0.75)} className="mt-12 md:mt-16">
          <QuickSearch />
        </motion.div>
      </div>

      <div className="border-t border-white/15 bg-ink">
        <div className="container">
          <ul className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4" aria-label={t.hero.trustAria}>
            {trust.map((item, i) => (
              <li key={item.label} className="relative flex flex-wrap items-baseline gap-x-2 bg-ink px-4 py-5 md:justify-center">
                {item.stars && <Star className="size-4 translate-y-0.5 fill-brand text-brand" aria-hidden />}
                <span className="whitespace-nowrap font-display text-xl font-bold md:text-2xl" translate="no">
                  {item.node}
                </span>
                <span className="text-sm text-white/85">{item.label}</span>
                {/* Thin orange line draws under each number once */}
                <motion.span
                  aria-hidden
                  className="absolute inset-x-4 bottom-0 h-0.5 origin-left bg-brand md:inset-x-8"
                  {...(ok ? { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true }, transition: { duration: 0.9, ease: "easeOut", delay: 0.2 + i * 0.1 } } : {})}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
