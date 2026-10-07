import { FileDown } from "lucide-react";

import { getCatalogueUrl } from "@/lib/catalogue";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** "Download product catalogue (PDF)" link. Renders nothing until the PDF exists in /public/catalogue. */
export function CatalogueLink({ locale, className }: { locale: Locale; className?: string }) {
  const url = getCatalogueUrl();
  if (!url) return null;
  return (
    <a
      href={url}
      download
      className={cn("inline-flex min-h-11 items-center gap-2 py-1 font-semibold transition-colors duration-150", className)}
    >
      <FileDown className="size-[18px] shrink-0" aria-hidden="true" />
      {getDictionary(locale).catalogue.download}
    </a>
  );
}
