import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Ghost pill that links from a home-page preview to its full page. */
export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild variant="ghost" className="h-12 px-7">
      <Link href={href}>
        {children}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </Button>
  );
}
