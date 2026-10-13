"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion";
import { photoByFile, shopSectionFile } from "@/data/photos";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { site } from "@/config/site";

const photo = photoByFile(shopSectionFile);

export function Shop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section id="shop" className="border-b border-line bg-graphite py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHead n="02" title="The shop" />
          <Reveal index={1}>
            <p className="max-w-md text-lg leading-relaxed text-ink/85 lg:ml-auto">
              Open bays, blue two-post lifts and a steel-truss roof. This is where your car gets worked on, and where {site.owner} can walk you through it.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-12 aspect-[4/3] overflow-hidden border border-line sm:aspect-[16/10] lg:aspect-[21/10]">
          <m.div className="absolute -inset-y-[9%] inset-x-0" style={reduce ? undefined : { y }}>
            <Image
              src={photo.file}
              alt={photo.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              quality={75}
              className="object-cover"
            />
          </m.div>
          <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-signal" aria-hidden />
          <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-signal" aria-hidden />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          <span>
            {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
          </span>
          <span>Plus code {site.address.plusCode}</span>
        </div>
      </div>
    </section>
  );
}
