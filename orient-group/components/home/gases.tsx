import Link from "next/link";

import { GasCylinder } from "@/components/gas-cylinder";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getProduct } from "@/data/products";
import { gasMessage } from "@/lib/whatsapp";

/** Standard cylinder colours. A red band marks the flammable refrigerants. */
const gases = [
  { label: "R22", slug: "r22-refrigerant-gas", color: "#8FD19A" },
  { label: "R410A", slug: "r410a-refrigerant-gas", color: "#EFA7BF" },
  { label: "R134a", slug: "r134a-refrigerant-gas", color: "#96CDEB" },
  { label: "R404A", slug: "r404a-refrigerant-gas", color: "#F07F2D" },
  { label: "R407C", slug: "r407c-refrigerant-gas", color: "#A0673C" },
  { label: "R32", slug: "r32-refrigerant-gas", color: "#96CDEB", band: true },
  // Until the client confirms which one he stocks.
  { label: "R600 / R600a", slug: "r600-refrigerant-gas", color: "#A7A9AC", band: true },
];

export function Gases() {
  return (
    <Section tone="white" id="refrigerant-gases">
      <SectionHeading eyebrow="Refrigerant gases" title="Refrigerant gases">
        Tap a gas to ask for the price and the cylinder sizes available. It opens
        WhatsApp with your question ready to send.
      </SectionHeading>
      {/* Scrolls sideways on phones, grid from tablet up. */}
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:scroll-px-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-7">
        {gases.map(({ label, slug, color, band }) => (
          <li
            key={label}
            className="flex w-36 shrink-0 snap-start flex-col items-center rounded-2xl border bg-background px-3 pt-5 pb-4 text-center sm:w-auto"
          >
            <GasCylinder id={slug} color={color} band={band} className="h-24 w-auto" />
            <p className="font-display mt-3 min-h-[2.5em] text-lg leading-tight font-extrabold text-balance">
              {label}
            </p>
            <WhatsAppButton
              message={gasMessage(label)}
              size="sm"
              variant="outline"
              className="mt-2 w-full px-3"
              ariaLabel={`Ask for price and cylinder sizes for ${label} on WhatsApp`}
            >
              Ask price
            </WhatsAppButton>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-[0.9375rem] text-muted-foreground">
        More about each gas:{" "}
        {gases.map(({ label, slug }, i) => {
          const product = getProduct(slug);
          return (
            <span key={label}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              {product ? (
                <Link
                  href={`/products/${product.slug}`}
                  className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
                >
                  {label}
                </Link>
              ) : (
                label
              )}
            </span>
          );
        })}
      </p>
    </Section>
  );
}
