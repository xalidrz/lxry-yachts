import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface Crumb {
  label: string;
  to?: string;
}

/** Banner at the top of every inner page: breadcrumbs, title and intro over a dark, softly lit backdrop. */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs: Crumb[];
  image?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-gold/15 bg-surface pb-16 pt-36 sm:pb-20 sm:pt-44">
      {image && (
        <img src={image} alt="" aria-hidden width={800} height={600} className="absolute inset-0 size-full object-cover opacity-30" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-surface" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{ backgroundImage: "radial-gradient(ellipse at 15% 0%, rgba(201,160,74,0.16), transparent 55%)" }}
      />
      <div className="container relative">
        <nav aria-label="Breadcrumb" className="label mb-8 flex flex-wrap items-center gap-2 text-[0.82rem] text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-gold-light">
            Home
          </Link>
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="size-3.5 text-gold/70" aria-hidden />
              {c.to && i < crumbs.length - 1 ? (
                <Link to={c.to} className="transition-colors hover:text-gold-light">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-gold-light">
                  {c.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="label mb-5 flex items-center gap-4 text-sm text-gold">
            <span className="h-px w-10 bg-gold/60" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="text-[clamp(2.3rem,5.4vw,4rem)] text-cream">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
        </motion.div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  );
}
