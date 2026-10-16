import { footer, site } from "@/data/content";
import { icons } from "./icons";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer data-surface="ink" className="mt-[var(--section-gap)] bg-surface pb-[calc(var(--dealerbar-h)+var(--s-3))] pt-8 text-fg md:pb-4">
      <div className="grid-12 gap-y-6">
        <div className="col-span-12 flex flex-col gap-3 lg:col-span-3">
          <Wordmark />
          <ul className="m-0 flex list-none gap-1 p-0">
            {footer.social.map((s) => {
              const Icon = icons[s.icon];
              return (
                <li key={s.id}>
                  <a href="#" aria-label={s.label} className="inline-flex size-6 items-center justify-center rounded-pill border border-line hover:border-fg">
                    <Icon className="size-[20px]" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <nav aria-label="Footer" className="col-span-12 grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4 lg:col-span-9">
          {footer.columns.map((c) => (
            <div key={c.title}>
              <h2 className="t-eyebrow mb-2 text-muted">{c.title}</h2>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="inline-flex min-h-[28px] items-center text-small hover:underline hover:underline-offset-4">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="col-span-12 flex flex-col gap-2 border-t border-line pt-3">
          <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-0.5 p-0">
            {footer.legal.map((l) => (
              <li key={l}>
                <a href="#" className="t-small hover:underline hover:underline-offset-4">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <p className="t-small text-muted">{footer.rights}</p>
          <p className="t-small">
            <strong className="font-semibold">{site.concept}</strong> <span className="text-muted">{site.mockNote}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
