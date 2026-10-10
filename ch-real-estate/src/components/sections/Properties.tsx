import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { chipLabels, filterByChip, type Chip } from "@/lib/filters";

const featured = properties.filter((p) => p.featured);

/** Home-page featured grid with working filter chips. Full inventory lives on /buy and /rent. */
export function Properties() {
  const [chip, setChip] = useState<Chip>("all");
  const list = filterByChip(featured, chip);

  return (
    <section id="properties" aria-labelledby="properties-title" className="scroll-mt-20 bg-ink pb-28 pt-36 sm:pt-44 lg:pt-36">
      <div className="container">
        <SectionHeading
          id="properties-title"
          eyebrow="Featured Properties"
          title={
            <>
              Homes, plots &amp; spaces <Gold>worth owning</Gold>
            </>
          }
          description="A hand-picked selection of verified listings across Wah Cantt. Every property is physically checked before it reaches you."
        />

        <Reveal className="mb-12 flex flex-wrap justify-center gap-3" delay={0.1}>
          <div role="group" aria-label="Filter properties" className="flex flex-wrap justify-center gap-3">
            {chipLabels.map((c) => (
              <Button key={c.id} variant="chip" size="sm" data-active={chip === c.id} aria-pressed={chip === c.id} onClick={() => setChip(c.id)}>
                {c.label}
              </Button>
            ))}
          </div>
        </Reveal>

        <div className="min-h-[28rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25 }}
              className="grid gap-7 md:grid-cols-2 xl:grid-cols-3"
            >
              {list.map((p, i) => (
                <PropertyCard key={p.id} p={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/buy">
              View all for sale <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link to="/rent">View all for rent</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
