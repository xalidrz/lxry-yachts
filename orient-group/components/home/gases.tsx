import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { getProduct } from "@/data/products";
import { gasMessage, whatsappUrl } from "@/lib/whatsapp";

const gases = ["R22", "R410A", "R134a", "R404A", "R407C", "R32", "R600"];

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
        {gases.map((gas) => (
          <li key={gas}>
            <a
              href={whatsappUrl(gasMessage(gas))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask for price and cylinder sizes for ${gas} on WhatsApp`}
              className="group flex h-full min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-center transition-colors duration-150 hover:border-white/40 hover:bg-white/[0.12]"
            >
              <span className="font-display text-2xl font-extrabold">{gas}</span>
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
        Blend, safety class and typical use:{" "}
        {gases.map((gas, i) => {
          const product = getProduct(`${gas.toLowerCase()}-refrigerant-gas`);
          return (
            <span key={gas}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              {product ? (
                <Link
                  href={`/products/${product.slug}`}
                  className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover:decoration-white"
                >
                  {gas}
                </Link>
              ) : (
                gas
              )}
            </span>
          );
        })}
      </p>
    </Section>
  );
}
