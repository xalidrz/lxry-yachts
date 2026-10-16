import { MapPin, Phone } from "lucide-react";
import { links, site } from "@/content";
import { Mandala } from "@/components/Mandala";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper px-5 pb-28 pt-16 sm:px-8 md:pb-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <p className="font-serif text-3xl font-semibold tracking-wide">{site.name}</p>
          <p className="mt-1 text-charcoal-soft">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-3 text-charcoal-soft">
          <p className="flex items-center justify-center gap-3 md:justify-start">
            <MapPin aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-sage-deep" />
            <span>
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </span>
          </p>
          <p className="flex items-center justify-center gap-3 md:justify-start">
            <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-sage-deep" />
            <a href={links.tel} className="hover:text-sage-deep">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
        <Mandala className="size-24 text-sage" />
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-sm text-charcoal-soft md:text-left">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
