import { Phone } from "lucide-react";

import { ContactDetails } from "@/components/contact-details";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { OFFICE_PHONE } from "@/lib/site";
import { GENERAL_MESSAGE } from "@/lib/whatsapp";

/** Contact block used on the home page and (with an H1) on /contact. */
export function ContactSection({
  asPage = false,
}: {
  /** True on /contact, where the heading is the page's H1 (and sits in the page hero instead). */
  asPage?: boolean;
}) {
  return (
    <Section id="contact" tone="light">
      {!asPage && (
        <SectionHeading eyebrow="Contact" title="Visit us or send your list">
          Send your material list on WhatsApp for a quote, call the office, or
          visit us in Shuwaikh Industrial Area.
        </SectionHeading>
      )}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <ContactDetails tone="light" />
        </div>
        <div className="on-dark flex flex-col justify-between gap-8 rounded-2xl bg-charcoal p-6 text-on-dark sm:p-8">
          <div>
            <h2 className="font-display text-2xl leading-snug font-extrabold">
              Need a price?
            </h2>
            <p className="mt-3 leading-relaxed text-on-dark-muted">
              We do not sell online. Message us the products and quantities you
              need and we reply with a price and delivery time.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <WhatsAppButton message={GENERAL_MESSAGE}>Chat on WhatsApp</WhatsAppButton>
            <Button asChild variant="secondary-dark">
              <a href={`tel:${OFFICE_PHONE.tel}`}>
                <Phone aria-hidden="true" />
                Call {OFFICE_PHONE.display}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
