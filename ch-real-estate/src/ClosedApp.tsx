import { useEffect } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site, whatsappLink } from "@/lib/site";

/**
 * Standalone "closed" page shown on every URL while VITE_SITE_CLOSED=true.
 * Deliberately self-contained (no router, no animation library) so the closed build stays tiny.
 */
export default function ClosedApp() {
  useEffect(() => {
    document.title = `Currently closed | ${site.name}`;
  }, []);

  const socials = [
    { icon: Facebook, label: "Facebook", href: site.social.facebook },
    { icon: Instagram, label: "Instagram", href: site.social.instagram },
    { icon: Youtube, label: "YouTube", href: site.social.youtube },
  ];

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* photo + brand overlays (same grading as the old hero) */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/images/hero.jpg"
          alt=""
          width={1600}
          height={1067}
          className="size-full object-cover object-[50%_35%] [filter:saturate(0.65)_sepia(0.25)_brightness(0.9)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,14,16,0.2)_0%,rgba(14,14,16,0.85)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Logo size={132} className="drop-shadow-[0_8px_30px_rgba(201,160,74,0.25)]" />

        <p className="label mt-9 inline-flex items-center gap-3 border border-gold/40 bg-ink/60 px-4 py-2 text-[0.85rem] text-gold-light backdrop-blur">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-gold" />
          </span>
          Currently closed
        </p>

        <h1 className="mt-8 text-[clamp(2.6rem,8vw,4.8rem)] leading-[1.05] text-cream">
          We're <span className="text-gold-gradient">closed</span> for now.
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
          The {site.name} website is closed at the moment. We'll be back soon — and until then our team is still happy
          to talk about buying, renting, selling or building.
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row">
          <a
            href={whatsappLink("Hello CH Real Estate & Builder's, I'd like to know more about your properties and construction services.")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            <WhatsAppIcon /> WhatsApp us
          </a>
          <a href={`tel:${site.phoneTel}`} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-ink/40 backdrop-blur")}>
            <Phone /> {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-ink/40 backdrop-blur")}>
            <Mail /> Email us
          </a>
        </div>

        <address className="mt-12 max-w-md text-[0.98rem] not-italic leading-relaxed text-muted-foreground">
          <MapPin className="mx-auto mb-3 size-5 text-gold" />
          {site.addressLines.join(", ")}
        </address>

        <div className="mt-8 flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex size-11 items-center justify-center border border-gold/30 bg-ink/40 text-gold backdrop-blur transition-all hover:border-gold hover:bg-gold hover:text-ink"
            >
              <s.icon className="size-[18px]" />
            </a>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">© 2026 {site.name}</p>
      </div>
    </main>
  );
}
