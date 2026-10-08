import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bath, BedDouble, MapPin, Maximize, SearchX, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { formatPKR, type Property } from "@/data/properties";
import { chipLabels, visibleProperties, type Chip, type Criteria } from "@/lib/filters";
import { whatsappLink } from "@/lib/site";

function PropertyCard({ p, index }: { p: Property; index: number }) {
  const isRent = p.listing === "rent";
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-gold/20 bg-surface transition-all duration-500 hover:border-gold/80 hover:shadow-gold-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={p.image}
          alt={`${p.title} — ${p.size} in ${p.area}`}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
        <Badge variant={isRent ? "dark" : "outline"} className="absolute left-4 top-4">
          {isRent ? "For Rent" : "For Sale"}
        </Badge>
        <div className="absolute bottom-4 left-4 bg-gold-gradient px-4 py-2 text-ink shadow-lg">
          <span className="label text-[0.7rem] font-semibold opacity-70">PKR </span>
          <span className="font-heading text-xl">{formatPKR(p.price)}</span>
          {isRent && <span className="label text-[0.7rem] font-semibold opacity-70"> / month</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.45rem] text-cream transition-colors group-hover:text-gold-light">{p.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-[0.95rem] text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-gold" /> {p.location}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gold/20 pt-5 text-[0.95rem] text-cream/90">
          <span className="flex items-center gap-2">
            <Maximize className="size-4 text-gold" /> {p.size}
          </span>
          {p.beds !== undefined && (
            <span className="flex items-center gap-2">
              <BedDouble className="size-4 text-gold" /> {p.beds} Beds
            </span>
          )}
          {p.baths !== undefined && (
            <span className="flex items-center gap-2">
              <Bath className="size-4 text-gold" /> {p.baths} Baths
            </span>
          )}
          {p.beds === undefined && p.tags?.map((t) => (
            <span key={t} className="label text-[0.8rem] text-gold-light">
              {t}
            </span>
          ))}
        </div>

        <a
          href={whatsappLink(`Hello, I'm interested in "${p.title}" (${p.size}, ${p.location}) listed ${isRent ? "for rent" : "for sale"}. Please share more details.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-6 inline-flex items-center gap-2 self-start text-[0.9rem] text-gold transition-colors hover:text-gold-light"
        >
          Enquire about this property <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

export function Properties({
  chip,
  criteria,
  onChip,
  onClear,
}: {
  chip: Chip;
  criteria: Criteria | null;
  onChip: (c: Chip) => void;
  onClear: () => void;
}) {
  const list = visibleProperties(chip, criteria);
  const filterKey = criteria ? JSON.stringify(criteria) : chip;

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
              <Button
                key={c.id}
                variant="chip"
                size="sm"
                data-active={!criteria && chip === c.id}
                aria-pressed={!criteria && chip === c.id}
                onClick={() => onChip(c.id)}
              >
                {c.label}
              </Button>
            ))}
          </div>
        </Reveal>

        {criteria && (
          <div className="mx-auto mb-10 flex max-w-xl items-center justify-between gap-4 border border-gold/30 bg-surface px-5 py-3">
            <p className="label text-sm text-gold-light">
              Search results · {list.length} {list.length === 1 ? "property" : "properties"}
            </p>
            <button
              type="button"
              onClick={onClear}
              className="label flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cream"
            >
              <X className="size-4" /> Clear
            </button>
          </div>
        )}

        <div className="min-h-[28rem]">
          <AnimatePresence mode="wait" initial={false}>
            {list.length > 0 && (
              <motion.div
                key={filterKey}
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
            )}
          </AnimatePresence>

          {list.length === 0 && (
            <div className="mx-auto max-w-lg border border-gold/20 bg-surface px-8 py-14 text-center">
              <SearchX className="mx-auto mb-5 size-9 text-gold" />
              <h3 className="text-2xl">No exact match yet</h3>
              <p className="mt-3 text-muted-foreground">
                We also hold off-market listings that are not shown here. Tell us what you are looking for and we will
                find it.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <a href="#contact">Tell us your requirement</a>
                </Button>
                {criteria && (
                  <Button variant="outline" onClick={onClear}>
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
