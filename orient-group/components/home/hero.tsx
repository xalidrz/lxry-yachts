import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/brands";
import { FOUNDED_YEAR, OFFICE_PHONE } from "@/lib/site";
import { QUOTE_MESSAGE } from "@/lib/whatsapp";

import heroImage from "@/public/products/refrigerant-gases.jpg";

const trust = [
  `Since ${FOUNDED_YEAR}`,
  `${brands.length} brands`,
  "Shuwaikh Industrial Area",
];

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-charcoal text-on-dark">
      {/* Product photo: right side on desktop, cropped to the cylinders, with a
          dark gradient on its left edge so the headline stays readable. */}
      <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block" aria-hidden="true">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="58vw"
          placeholder="blur"
          className="object-cover object-[78%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#1F1F1F_0%,rgba(31,31,31,0.82)_22%,rgba(31,31,31,0.35)_55%,rgba(31,31,31,0.15)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(31,31,31,0.55)_0%,transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 pt-32 pb-14 sm:px-6 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-28">
        <div className="max-w-2xl lg:max-w-[560px]">
          <p className="mb-5 text-sm font-bold tracking-[0.16em] text-on-dark-muted uppercase">
            Shuwaikh Industrial Area, Kuwait
          </p>
          <h1 className="font-display text-[2.125rem] leading-[1.12] font-extrabold sm:text-5xl lg:text-[3.25rem]">
            HVAC, electrical and fixing materials for Kuwait&apos;s contractors
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-on-dark-muted sm:text-xl">
            Copper pipes, refrigerant gases, insulation, conduits, chemical
            anchors and engraved labels, supplied from Shuwaikh Industrial Area
            since 2010.
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
          <p className="mt-7 text-sm font-semibold text-on-dark-muted">
            {trust.map((item, i) => (
              <span key={item}>
                {i > 0 && (
                  <span aria-hidden="true" className="mx-2 text-white/40">
                    ·
                  </span>
                )}
                {item}
              </span>
            ))}
          </p>
        </div>

        {/* Mobile and tablet: the same photo as a cropped band under the text. */}
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
          <Image
            src={heroImage}
            alt="Refrigerant gas cylinders supplied by Orient Group Gulf in Kuwait"
            fill
            sizes="(min-width: 640px) 90vw, 100vw"
            placeholder="blur"
            className="object-cover object-[75%_35%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(31,31,31,0.35)_0%,transparent_45%)]" />
        </div>
      </div>
      {/* Red edge, echoing the underline in the logo. */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-brand" />
    </section>
  );
}
