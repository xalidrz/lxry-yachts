import { useEffect, useState } from "react";
import { Flower2, Phone } from "lucide-react";
import { links, nav, navCaption } from "@/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Transparent over the hero, solid espresso once the page is scrolled. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-tone="dark"
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500",
        scrolled ? "border-gold/15 bg-espresso" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3 text-cream" aria-label="Vesari Yoga, retour en haut">
          <Flower2 aria-hidden="true" strokeWidth={1.25} className="size-9 text-gold" />
          <span className="flex flex-col">
            <span className="font-serif text-2xl font-medium leading-none tracking-[0.3em]">VESARI</span>
            <span className="mt-1.5 text-[0.62rem] font-medium leading-none tracking-[0.3em] text-cream-dim">{navCaption}</span>
          </span>
        </a>
        <nav aria-label="Navigation principale" className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-[0.95rem] text-cream transition-colors duration-500 hover:text-gold">
              {item.label}
            </a>
          ))}
        </nav>
        <Button asChild size="sm" className="hidden md:inline-flex">
          <a href={links.tel}>
            <Phone aria-hidden="true" strokeWidth={1.5} />
            Appeler
          </a>
        </Button>
      </div>
    </header>
  );
}
