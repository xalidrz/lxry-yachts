import { cn } from "@/lib/utils";

/**
 * "عربي / EN" toggle. English is the only live language today; the Arabic side
 * is rendered but inactive. When Arabic is ready, turn the Arabic button into a
 * link to the Arabic route (see lib/i18n.ts) and the layout switches to RTL.
 */
export function LanguageToggle({ className }: { className?: string }) {
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn("flex items-center gap-1.5 text-sm", className)}
    >
      <button
        type="button"
        lang="ar"
        dir="rtl"
        aria-disabled="true"
        title="Arabic version coming soon"
        className="cursor-not-allowed rounded px-1 text-toggle-inactive"
      >
        عربي
        <span className="sr-only"> (coming soon)</span>
      </button>
      <span aria-hidden="true" className="text-border">
        /
      </span>
      <span lang="en" aria-current="true" className="px-1 font-bold text-foreground">
        EN
      </span>
    </div>
  );
}
