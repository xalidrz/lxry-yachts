import type { ReactNode } from "react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/** Top banner for inner pages: breadcrumb, eyebrow, h1, intro and an optional background photo. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
  image,
  imagePosition = "50% 50%",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumb: string;
  image?: string;
  imagePosition?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-32 md:pb-24 md:pt-44">
      {image && (
        <>
          <img src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 -z-20 size-full object-cover opacity-45" style={{ objectPosition: imagePosition }} />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_20%_100%,rgba(247,147,30,0.18),transparent_70%)]" />
        </>
      )}
      <div className="container">
        <m.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-1.5 text-[0.85rem] text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-volt-light">
              Home
            </Link>
            <ChevronRight aria-hidden className="size-3.5" />
            <span aria-current="page" className="text-white/90">
              {crumb}
            </span>
          </nav>
          <p className="label mt-8 flex items-center gap-3 text-[0.9rem] text-volt-light">
            <span aria-hidden className="h-px w-8 bg-brandred" />
            {eyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(2.1rem,5.2vw,3.9rem)] leading-[1.06]">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </m.div>
      </div>
    </section>
  );
}
