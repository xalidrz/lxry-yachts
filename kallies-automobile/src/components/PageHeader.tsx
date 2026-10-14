import type { ReactNode } from "react";
import { PhotoBg } from "@/components/PhotoBg";

/** Dark page intro used on every inner page. */
export function PageHeader({ eyebrow, title, lead, children, image, photo }: { photo?: string; image?: string; eyebrow?: string; title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      {image && <PhotoBg src={image} position="low" />}
      <div className={photo ? "container grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14" : "container py-14 md:py-20"}>
        <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display-2 mt-4 max-w-3xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
        </div>
        {photo && <img src={photo} alt="" width={1376} height={768} fetchPriority="high" className="aspect-[16/9] w-full rounded-lg border border-white/15 object-cover" />}
      </div>
    </section>
  );
}
