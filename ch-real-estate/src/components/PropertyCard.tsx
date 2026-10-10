import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Bath, BedDouble, MapPin, Maximize } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Badge } from "@/components/ui/badge";
import { formatPKR, type Property } from "@/data/properties";
import { whatsappLink } from "@/lib/site";

export function PropertyCard({ p, index = 0 }: { p: Property; index?: number }) {
  const isRent = p.listing === "rent";
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col border border-gold/20 bg-surface transition-all duration-500 hover:border-gold/80 hover:shadow-gold-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={p.image}
          alt={`${p.title} — ${p.size} in ${p.area}`}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
        <h3 className="text-[1.45rem] text-cream transition-colors group-hover:text-gold-light">
          {/* stretched link: the whole card opens the detail page */}
          <Link to={`/property/${p.id}`} className="after:absolute after:inset-0 after:content-['']">
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-2 text-[0.95rem] text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-gold" /> {p.location}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gold/20 pt-5 text-[0.95rem] text-cream/90">
          <span className="flex items-center gap-2">
            <Maximize className="size-4 text-gold" /> {p.size}
          </span>
          {p.beds !== undefined && (
            <span className="flex items-center gap-2">
              <BedDouble className="size-4 text-gold" /> {p.beds} {p.beds === 1 ? "Bed" : "Beds"}
            </span>
          )}
          {p.baths !== undefined && (
            <span className="flex items-center gap-2">
              <Bath className="size-4 text-gold" /> {p.baths} {p.baths === 1 ? "Bath" : "Baths"}
            </span>
          )}
          {p.beds === undefined &&
            p.tags?.map((t) => (
              <span key={t} className="label text-[0.8rem] text-gold-light">
                {t}
              </span>
            ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="label inline-flex items-center gap-2 text-[0.9rem] text-gold transition-colors group-hover:text-gold-light">
            View details
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <a
            href={whatsappLink(`Hello, I'm interested in "${p.title}" (${p.size}, ${p.location}) listed ${isRent ? "for rent" : "for sale"}. Please share more details.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${p.title} on WhatsApp`}
            className="relative z-10 flex size-10 items-center justify-center border border-gold/30 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
          >
            <WhatsAppIcon className="size-[18px]" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
