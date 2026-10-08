import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Gold } from "@/components/SectionHeading";
import { contactLink, whatsappLink } from "@/lib/site";

/** Closing call-to-action used at the bottom of most pages. */
export function CtaBand({
  title = (
    <>
      Ready to buy, rent or <Gold>build?</Gold>
    </>
  ),
  text = "Tell us what you are looking for. We will reply the same day and arrange a free site visit if you need one.",
  interest,
  message,
}: {
  title?: ReactNode;
  text?: string;
  interest?: string;
  message?: string;
}) {
  return (
    <section className="border-t border-gold/15 bg-surface py-24">
      <div className="container">
        <Reveal className="relative overflow-hidden border border-gold/25 bg-ink px-7 py-14 text-center sm:px-14 sm:py-16">
          <div
            className="absolute inset-0"
            aria-hidden
            style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(201,160,74,0.18), transparent 65%)" }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] text-cream">{title}</h2>
            <p className="mt-5 text-lg text-muted-foreground">{text}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to={contactLink({ interest, message })}>
                  Get in touch <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={whatsappLink("Hello CH Real Estate & Builder's, I'd like to know more.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp us
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
