import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PearlButton } from "@/components/ui/pearl-button";

/** Ghost pill that links from a home-page preview to its full page. */
export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <PearlButton asChild variant="secondary">
      <Link href={href}>
        {children}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </PearlButton>
  );
}
