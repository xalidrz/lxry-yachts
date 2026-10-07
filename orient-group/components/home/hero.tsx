import Link from "next/link";
import { CalendarCheck, Phone, Tags, Truck } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/brands";
import { FOUNDED_YEAR, OFFICE_PHONE } from "@/lib/site";
import { QUOTE_MESSAGE } from "@/lib/whatsapp";

const facts = [
  { icon: CalendarCheck, label: `Since ${FOUNDED_YEAR}` },
  { icon: Tags, label: `${brands.length} brands` },
  { icon: Truck, label: "Fast delivery across Kuwait" },
];

/** Decorative coil, drawn as concentric rings in neutral greys. */
function CoilArt() {
  const rings = Array.from({ length: 9 }, (_, i) => 34 + i * 26);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 520 520"
      className="pointer-events-none absolute -right-24 top-1/2 hidden size-[520px] -translate-y-1/2 lg:block xl:-right-8"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="260"
          cy="260"
          r={r}
          fill="none"
          stroke="#636466"
          strokeWidth={14 - i * 0.9}
          strokeOpacity={0.55 - i * 0.045}
        />
      ))}
      {rings.map((r) => (
        <circle
          key={`h-${r}`}
          cx="260"
          cy="260"
          r={r - 2}
          fill="none"
          stroke="#F2F2F3"
          strokeWidth="1.5"
          strokeOpacity="0.18"
          strokeDasharray="90 600"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section
      className="on-dark relative overflow-hidden bg-charcoal pt-36 pb-16 text-on-dark sm:pt-44 sm:pb-24"
      style={{
        backgroundImage:
          "radial-gradient(60% 80% at 85% 20%, rgba(255,255,255,0.06), transparent 70%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 44px 44px, 44px 44px",
      }}
    >
      <CoilArt />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <p className="mb-5 text-sm font-bold tracking-[0.16em] text-on-dark-muted uppercase">
          Shuwaikh Industrial Area, Kuwait
        </p>
        <h1 className="font-display max-w-3xl text-[2.125rem] leading-[1.12] font-extrabold sm:text-5xl lg:text-[3.5rem]">
          HVAC, electrical and fixing materials for Kuwait&apos;s contractors
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted sm:text-xl">
          Copper pipes, refrigerant gases, insulation, conduits, chemical anchors
          and engraved labels, supplied from Shuwaikh Industrial Area since 2010.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <WhatsAppButton message={QUOTE_MESSAGE} size="lg">
            Request a quote on WhatsApp
          </WhatsAppButton>
          <Button asChild variant="primary" size="lg">
            <Link href="/products">Browse products</Link>
          </Button>
          <Button asChild variant="secondary-dark" size="lg">
            <a href={`tel:${OFFICE_PHONE.tel}`}>
              <Phone aria-hidden="true" />
              Call {OFFICE_PHONE.display}
            </a>
          </Button>
        </div>
        <ul className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-10">
          {facts.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-on-dark">
              <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-semibold">{label}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Red edge, echoing the underline in the logo. */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-brand" />
    </section>
  );
}
