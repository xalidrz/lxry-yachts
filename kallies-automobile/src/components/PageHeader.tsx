import type { ReactNode } from "react";
import { PhotoBg } from "@/components/PhotoBg";

/** Dark page intro used on every inner page. */
export function PageHeader({ eyebrow, title, lead, children, image }: { image?: string; eyebrow?: string; title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      {image && <PhotoBg src={image} position="low" />}
      <div className="container py-14 md:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display-2 mt-4 max-w-3xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
