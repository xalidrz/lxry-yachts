import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { Accent } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { site, telHref } from "@/lib/site";

/** "Ready for a free quote?" closing band shared by every page. */
export function CtaBand({ service }: { service?: "Electrical" | "Wedding Lighting" | "Both" }) {
  return (
    <section aria-label="Get a free quote" className="bg-surface pb-24 pt-4 md:pb-32">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-volt/40 bg-gradient-to-br from-surface-2 to-ink px-6 py-12 text-center md:px-12">
            <div aria-hidden className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-volt/20 blur-[90px]" />
            <h2 className="relative text-[clamp(1.6rem,3.6vw,2.4rem)]">
              Ready for a <Accent>free quote</Accent>?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">Electrical job or wedding date — tell us what you have planned and we'll take it from there.</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to={service ? `/contact?service=${encodeURIComponent(service)}` : "/contact"}>Get a Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={telHref}>
                  <Phone /> {site.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
