import { MapPin, Phone } from "lucide-react";
import { PearlButton } from "@/components/ui/pearl-button";
import { Reveal } from "@/components/motion";
import { links, site } from "@/config/site";

/** Call / directions band that closes the inner pages. */
export function CtaBand({ title = "Bring it in. Talk to Goldy." }: { title?: string }) {
  return (
    <section className="bg-carbon-surface border-t border-white/10 py-16 sm:py-20">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
        <div>
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-muted">
            {site.address.street}, {site.address.city}, {site.address.region}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PearlButton asChild>
            <a href={links.tel}>
              <Phone className="phone-icon size-5" aria-hidden />
              {site.phone.display}
            </a>
          </PearlButton>
          <PearlButton asChild variant="secondary">
            <a href={links.directions} target="_blank" rel="noopener noreferrer">
              <MapPin className="size-5" aria-hidden />
              Get Directions
            </a>
          </PearlButton>
        </div>
      </Reveal>
    </section>
  );
}
