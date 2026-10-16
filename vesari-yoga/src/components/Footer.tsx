import { MapPin, Phone } from "lucide-react";
import { links, site } from "@/content";
import { Mandala } from "@/components/Mandala";

export function Footer() {
  return (
    <footer data-tone="dark" className="bg-espresso px-5 pb-28 pt-16 text-cream sm:px-8 md:pb-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-serif text-3xl font-medium tracking-[0.3em]">VESARI</p>
          <p className="mt-2 text-sm tracking-[0.2em] text-cream-dim">{site.tagline.toUpperCase()}</p>
        </div>
        <div className="flex flex-col gap-3 text-cream-dim">
          <p className="flex items-center justify-center gap-3 md:justify-start">
            <MapPin aria-hidden="true" strokeWidth={1.25} className="size-5 shrink-0 text-gold" />
            <span>
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </span>
          </p>
          <p className="flex items-center justify-center gap-3 md:justify-start">
            <Phone aria-hidden="true" strokeWidth={1.25} className="size-5 shrink-0 text-gold" />
            <a href={links.tel} className="transition-colors duration-500 hover:text-gold">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
        <Mandala className="size-24 text-gold/70" />
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-gold/15 pt-6 text-center text-sm text-cream-dim md:text-left">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
