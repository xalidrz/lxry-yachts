import Image from "next/image";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { visibleServices } from "@/data/services";
import { photoByFile } from "@/data/photos";

export function Services() {
  return (
    <section id="services" className="grid-lines border-b border-line bg-graphite py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead n="03" title="Services" intro="What the shop does, confirmed by customer reviews and the shop's Google listing." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((s, i) => {
            const photo = photoByFile(s.photo);
            return (
              <Reveal key={s.title} as="li" index={i} className="group border border-line bg-surface">
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                    <Image
                      src={photo.file}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                      quality={75}
                      className="object-cover"
                    />
                    <span className="absolute left-0 top-0 bg-graphite px-3 py-2 font-mono text-sm text-signal-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-0 top-0 grid size-11 place-items-center bg-signal-deep text-white">
                      <s.icon className="size-5" aria-hidden />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{s.summary}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
