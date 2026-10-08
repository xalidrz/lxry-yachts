import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import type { Chip } from "@/lib/filters";

interface NavLink {
  label: string;
  href: string;
  /** Buy / Rent also switch the property filter. */
  chip?: Chip;
}

const links: NavLink[] = [
  { label: "Buy", href: "#properties", chip: "sale" },
  { label: "Rent", href: "#properties", chip: "rent" },
  { label: "Construction", href: "#construction" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onListing, onBookVisit }: { onListing: (c: Chip) => void; onBookVisit: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (l: NavLink) => {
    if (l.chip) onListing(l.chip);
    setOpen(false);
  };

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled || open
          ? "border-gold/20 bg-ink/70 py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink/55"
          : "border-transparent bg-transparent py-4",
        open && "bg-ink",
      )}
    >
      <nav className="container flex items-center justify-between gap-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-3" aria-label="CH Real Estate & Builder's — home" onClick={() => setOpen(false)}>
          <Logo size={scrolled ? 52 : 60} className="transition-all duration-500" />
          <span className="hidden flex-col leading-none xl:flex">
            <span className="text-gold-gradient font-heading text-2xl tracking-wide">CH</span>
            <span className="label mt-1 text-[0.68rem] text-muted-foreground">Real Estate &amp; Builder's</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => go(l)}
                className="label group relative py-2 text-[0.95rem] text-cream/85 transition-colors hover:text-gold-light"
              >
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-gradient transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <a href="#contact" onClick={onBookVisit}>
              Book a Site Visit
            </a>
          </Button>
          <a
            href={`tel:${site.phoneTel}`}
            aria-label={`Call ${site.phoneDisplay}`}
            className="flex size-11 items-center justify-center border border-gold/30 text-gold transition-colors hover:border-gold hover:bg-gold/10 md:hidden"
          >
            <Phone className="size-[18px]" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center border border-gold/30 text-gold-light transition-colors hover:border-gold hover:bg-gold/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

    </header>

    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          key="menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pb-10 pt-28 lg:hidden"
          style={{ backgroundImage: "radial-gradient(ellipse at 80% 0%, rgba(201,160,74,0.12), transparent 60%)" }}
        >
          <ul className="flex flex-1 flex-col justify-center gap-1">
            {links.map((l, i) => (
              <motion.li
                key={l.label}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-gold/15"
              >
                <a
                  href={l.href}
                  onClick={() => go(l)}
                  className="flex items-baseline gap-4 py-4 font-heading text-[2rem] text-cream transition-colors hover:text-gold-light"
                >
                  <span className="label w-7 text-xs text-gold">0{i + 1}</span>
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <Button asChild size="lg" className="w-full">
              <a
                href="#contact"
                onClick={() => {
                  onBookVisit();
                  setOpen(false);
                }}
              >
                Book a Site Visit
              </a>
            </Button>
            <p className="label text-center text-sm text-muted-foreground">
              Call <a href={`tel:${site.phoneTel}`} className="text-gold-light">{site.phoneDisplay}</a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
}
