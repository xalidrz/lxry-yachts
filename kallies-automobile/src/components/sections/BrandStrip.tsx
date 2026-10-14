import { Link } from "react-router-dom";
import { brands } from "@/data/site";
import { useI18n } from "@/i18n";

/** Text wordmarks only — each one filters the inventory by make. Slow marquee that pauses on hover/focus. */
export function BrandStrip() {
  const { t } = useI18n();
  const list = (dup: boolean) =>
    brands.map((b) => (
      <li key={`${dup}-${b}`} className="shrink-0 px-6 md:px-10">
        <Link
          to={`/fahrzeuge?marke=${encodeURIComponent(b)}`}
          translate="no"
          tabIndex={dup ? -1 : undefined}
          className="font-display text-lg font-bold uppercase tracking-[0.12em] text-grey transition-colors hover:text-ink md:text-xl"
        >
          {b}
        </Link>
      </li>
    ));

  return (
    <section aria-label={t.brandStrip.aria} className="border-y border-line bg-white">
      <div className="container py-10 md:py-12">
        <p className="eyebrow mb-6 text-center">{t.brandStrip.label}</p>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee">
            <ul className="flex shrink-0 items-center">{list(false)}</ul>
            <ul className="flex shrink-0 items-center" aria-hidden data-dup>
              {list(true)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
