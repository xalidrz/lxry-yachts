import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { getProduct } from "@/data/products";
import { gasMessage, whatsappUrl } from "@/lib/whatsapp";

const gases = [
  { label: "R22", slug: "r22-refrigerant-gas" },
  { label: "R410A", slug: "r410a-refrigerant-gas" },
  { label: "R134a", slug: "r134a-refrigerant-gas" },
  { label: "R404A", slug: "r404a-refrigerant-gas" },
  { label: "R407C", slug: "r407c-refrigerant-gas" },
  { label: "R32", slug: "r32-refrigerant-gas" },
  // Until the client confirms which one he stocks.
  { label: "R600 / R600a", slug: "r600-refrigerant-gas" },
];

export function Gases() {
  return (
    <Section tone="dark" id="refrigerant-gases">
      <SectionHeading
        tone="dark"
        eyebrow="Refrigerant gases"
        title="Refrigerant gases"
      >
        Tap a gas to ask for the price and the cylinder sizes available. It opens
        WhatsApp with your question ready to send.
      </SectionHeading>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {gases.map(({ label }) => (
          <li key={label}>
            <a
              href={whatsappUrl(gasMessage(label))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask for price and cylinder sizes for ${label} on WhatsApp`}
              className="group flex h-full min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-center transition-colors duration-150 hover:border-white/40 hover:bg-white/[0.12]"
            >
              <span className="font-display text-balance text-2xl leading-tight font-extrabold">
                {label}
              </span>
              <span className="flex items-center gap-2 text-sm text-[#C9D3D8]">
                <span className="flex size-7 items-center justify-center rounded-full bg-whatsapp text-white">
                  <MessageCircle className="size-4" aria-hidden="true" />
                </span>
                Ask price
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-[0.9375rem] text-[#C9D3D8]">
        More about each gas:{" "}
        {gases.map(({ label, slug }, i) => {
          const product = getProduct(slug);
          return (
            <span key={label}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              {product ? (
                <Link
                  href={`/products/${product.slug}`}
                  className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover:decoration-white"
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
