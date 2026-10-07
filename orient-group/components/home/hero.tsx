import Link from "next/link";
import { CalendarCheck, Tags, Truck } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/brands";
import { FOUNDED_YEAR } from "@/lib/site";
import { QUOTE_MESSAGE } from "@/lib/whatsapp";

const facts = [
  { icon: CalendarCheck, label: `Since ${FOUNDED_YEAR}` },
  { icon: Tags, label: `${brands.length} brands` },
  { icon: Truck, label: "Fast delivery across Kuwait" },
];

/** Decorative copper coil, drawn as concentric rings. */
function CoilArt() {
  const rings = Array.from({ length: 9 }, (_, i) => 34 + i * 26);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 520 520"
      className="pointer-events-none absolute -right-24 top-1/2 hidden size-[520px] -translate-y-1/2 opacity-90 lg:block xl:-right-8"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="260"
          cy="260"
          r={r}
          fill="none"
          stroke="#B4532A"
          strokeWidth={14 - i * 0.9}
          strokeOpacity={0.9 - i * 0.07}
        />
      ))}
      {rings.map((r) => (
        <circle
          key={`h-${r}`}
          cx="260"
          cy="260"
          r={r - 2}
          fill="none"
          stroke="#E3A07F"
          strokeWidth="1.5"
          strokeOpacity="0.28"
          strokeDasharray="90 600"
          strokeLinecap="round"
        />
      ))}
      <circle cx="260" cy="260" r="14" fill="#14232D" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      className="on-dark relative overflow-hidden bg-steel pt-36 pb-16 text-white sm:pt-44 sm:pb-24"
      style={{
        backgroundImage:
          "radial-gradient(60% 80% at 85% 20%, rgba(180,83,42,0.22), transparent 70%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 44px 44px, 44px 44px",
      }}
    >
      <CoilArt />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <p className="mb-5 text-sm font-bold tracking-[0.16em] text-[#E3A07F] uppercase">
          Shuwaikh Industrial Area, Kuwait
        </p>
        <h1 className="font-display max-w-3xl text-[2.125rem] leading-[1.12] font-extrabold sm:text-5xl lg:text-[3.5rem]">
          HVAC, electrical and fixing materials for Kuwait&apos;s contractors
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#C9D3D8] sm:text-xl">
          Copper pipes, refrigerant gases, insulation, conduits, chemical anchors
          and engraved labels, supplied from Shuwaikh Industrial Area since 2010.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton message={QUOTE_MESSAGE} size="lg">
            Request a quote on WhatsApp
          </WhatsAppButton>
          <Button asChild variant="secondary-dark" size="lg">
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
        <ul className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-10">
          {facts.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-[#E3EAED]">
              <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-semibold">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
