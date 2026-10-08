import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { cn } from "@/lib/utils";

const line1 = ["Buy.", "Sell.", "Build."];
const line2 = ["One", "trusted", "name."];

function Word({ children, index, gold }: { children: string; index: number; gold?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        className={cn("inline-block", gold && "text-gold-gradient")}
        initial={{ y: "115%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.35 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[calc(100svh-3rem)] flex-col lg:min-h-[calc(100svh-4.5rem)]" aria-label="Welcome">
      {/* Photo layer + dark overlay */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <motion.img
          src="/images/hero.svg"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(14,14,16,0.7)_100%)]" />
      </div>

      <div className="container relative z-10 flex flex-1 flex-col items-center justify-center pb-10 pt-28 text-center sm:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="label mb-6 flex items-center gap-4 text-[0.85rem] text-gold-light sm:text-sm"
        >
          <span className="hidden h-px w-12 bg-gold/70 sm:block" aria-hidden />
          <span className="text-balance">Real Estate &amp; Construction · Wah Cantt</span>
          <span className="hidden h-px w-12 bg-gold/70 sm:block" aria-hidden />
        </motion.p>

        <h1
          aria-label="Buy. Sell. Build. One trusted name."
          className="text-[clamp(2.6rem,7.6vw,5.4rem)] leading-[1.06] text-cream drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]"
        >
          <span className="flex flex-wrap justify-center gap-x-[0.28em]" aria-hidden>
            {line1.map((w, i) => (
              <Word key={w} index={i}>{w}</Word>
            ))}
          </span>
          <span className="flex flex-wrap justify-center gap-x-[0.28em]" aria-hidden>
            {line2.map((w, i) => (
              <Word key={w} index={i + line1.length} gold>{w}</Word>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl"
        >
          Find the right property — or build the home you have always imagined. Verified listings, honest pricing and
          quality construction, handled by one team from first site visit to final handover.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/buy">
              Explore Properties <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full bg-ink/30 backdrop-blur sm:w-auto">
            <Link to="/construction">Start Construction</Link>
          </Button>
        </motion.div>

      </div>

      {/* Floating search bar — overlaps the next section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="container relative z-20 -mb-14 lg:-mb-10"
      >
        <SearchBar />
      </motion.div>
    </section>
  );
}
