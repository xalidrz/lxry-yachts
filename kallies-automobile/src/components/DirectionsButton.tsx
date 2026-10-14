import { Navigation } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { DIRECTIONS_URL } from "@/lib/maps";

/** The accessible name starts with the visible text (WCAG 2.5.3 Label in Name) so voice control works.
 *  A real link (no click handler, iframe or popup) so mobile OSes can hand it to the Google Maps app. */
export function DirectionsButton({ children = "Route planen", ...props }: Omit<ButtonProps, "asChild" | "children"> & { children?: string }) {
  return (
    <Button asChild {...props}>
      <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" aria-label={`${children}: Route zu Kallies Automobile in Google Maps planen (öffnet in neuem Tab)`}>
        <Navigation aria-hidden />
        {children}
      </a>
    </Button>
  );
}
