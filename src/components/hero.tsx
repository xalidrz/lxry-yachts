import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OpenBadge } from "@/components/open-badge";
import { heroPhoto } from "@/data/photos";
import { links, site } from "@/config/site";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-graphite">
      <Image
        src={heroPhoto.file}
        alt={heroPhoto.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="hero-zoom -z-20 animate-hero-zoom object-cover object-[64%_50%] lg:object-center"
      />
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="animate-rise">
          <OpenBadge />
        </div>
        <h1 className="animate-rise mt-6 max-w-5xl font-display text-[3.4rem] font-extrabold uppercase leading-[0.9] tracking-tight text-ink [animation-delay:80ms] sm:text-7xl lg:text-[6.25rem]">
          Honest Repairs.
          <span className="block text-signal">Hayward&rsquo;s 4.7<span className="font-sans text-[0.72em] font-black">★</span> Shop.</span>
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ink/85 [animation-delay:160ms] sm:text-xl">
          Honest repairs, fair prices, and an owner who explains the work.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap gap-3 [animation-delay:240ms]">
          <Button asChild className="h-14 px-8 text-lg">
            <a href={links.tel}>
              <Phone className="phone-icon size-5" aria-hidden />
              Call Now
            </a>
          </Button>
          <Button asChild variant="ghost" className="h-14 px-8 text-lg">
            <a href={links.directions} target="_blank" rel="noopener noreferrer">
              <MapPin className="size-5" aria-hidden />
              Get Directions
            </a>
          </Button>
        </div>
        <p className="animate-rise mt-6 text-sm text-muted [animation-delay:320ms]">
          {site.address.street}, {site.address.city}, {site.address.region} · Owner-run by {site.owner}
        </p>
      </div>
    </section>
  );
}
