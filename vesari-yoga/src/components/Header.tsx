import { Phone } from "lucide-react";
import { links, nav, site } from "@/content";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-serif text-2xl font-semibold tracking-wide text-charcoal">
          {site.name}
        </a>
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-charcoal-soft transition-colors duration-500 hover:text-sage-deep">
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
