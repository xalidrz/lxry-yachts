import { site } from "@/data/content";

/** Text-only wordmark (concept). */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#top" aria-label={`${site.name} (${site.wordmarkTag}) — home`} className={`group inline-flex flex-col leading-none ${className ?? ""}`}>
      <span className="font-display text-[20px] font-semibold tracking-[0.32em]">{site.name}</span>
      <span aria-hidden="true" className="mt-0.5 block h-[2px] w-3 bg-red" />
    </a>
  );
}
