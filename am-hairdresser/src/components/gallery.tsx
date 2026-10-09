"use client";

import { ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { gallery } from "@/data/gallery";

const Lightbox = dynamic(() => import("@/components/lightbox").then((m) => m.Lightbox), { ssr: false });

export function Gallery() {
  const { t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const caption = (id: string) => t.gallery.captions[id] ?? "";

  return (
    <section id="gallery" className="section">
      <div className="container">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} sub={t.gallery.sub} />

        <div className="columns-2 gap-3 md:columns-3 md:gap-4">
          {gallery.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.07} className="mb-3 break-inside-avoid md:mb-4">
              {g.src ? (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${t.gallery.open}: ${caption(g.id)}`}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-gold-edge"
                  style={{ aspectRatio: `${g.w} / ${g.h}` }}
                >
                  <Image
                    src={g.src}
                    alt={caption(g.id)}
                    width={g.w}
                    height={g.h}
                    sizes="(min-width: 1200px) 380px, (min-width: 768px) 33vw, 50vw"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 text-start text-xs text-cream/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:text-sm">
                    {caption(g.id)}
                  </span>
                </button>
              ) : (
                <div className="glass grid place-items-center gap-2 rounded-2xl border-dashed p-6 text-center text-sm text-cream/55" style={{ aspectRatio: `${g.w} / ${g.h}` }}>
                  <ImageIcon className="size-7 text-gold/70" strokeWidth={1.5} />
                  {t.gallery.placeholder}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && <Lightbox index={active} onIndex={setActive} />}
    </section>
  );
}
