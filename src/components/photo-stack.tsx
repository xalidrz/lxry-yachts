"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/lightbox";
import type { Photo } from "@/data/photos";

/** Fanned stack of photos; hover or focus spreads it, click opens the lightbox on that photo. */
export function PhotoStack({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <div className="photo-stack" tabIndex={0} role="group" aria-label="Photos of the shop exterior">
        {photos.map((p, i) => (
          <button
            key={p.file}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View photo ${i + 1} of ${photos.length}: ${p.alt}`}
            className={`p p${i + 1} block`}
          >
            <Image src={p.file} alt="" fill sizes="(min-width: 1024px) 260px, 60vw" quality={75} className="object-cover" />
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">Click to view</p>
      <Lightbox photos={photos} index={open} onIndexChange={setOpen} label="Shop exterior photos" />
    </div>
  );
}
