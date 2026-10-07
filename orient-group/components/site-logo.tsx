import Image from "next/image";

import type { Logo } from "@/lib/logo";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Logo image when public/logo.png exists, otherwise the text logo. */
export function SiteLogo({
  logo,
  className,
  textClassName,
  priority,
}: {
  logo: Logo | null;
  className?: string;
  textClassName?: string;
  priority?: boolean;
}) {
  if (logo) {
    return (
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={priority}
        sizes="280px"
        className={cn("h-10 w-auto object-contain object-left", className)}
      />
    );
  }
  return (
    <span
      className={cn(
        "font-display leading-none font-bold whitespace-nowrap",
        textClassName,
      )}
    >
      {SITE_NAME}
    </span>
  );
}
