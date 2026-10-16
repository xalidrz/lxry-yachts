import { useId, useState } from "react";
import { Phone, Navigation, SearchX, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { dealers } from "@/data/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

type Status = "sample" | "loading" | "results" | "empty" | "error";
const ZIP = /^\d{5}$/;

export function DealerFinder() {
  const uid = useId();
  const [zip, setZip] = useState("");
  const [fieldError, setFieldError] = useState(false);
  const [status, setStatus] = useState<Status>("sample");
  const [searched, setSearched] = useState("");
  const [active, setActive] = useState<string>(dealers.list[0].id);

  const run = (value: string) => {
    setStatus("loading");
    window.setTimeout(() => {
      // mock outcomes so every state can be reviewed: 00000 = empty, 99999 = service error
      setSearched(value);
      setStatus(value === "00000" ? "empty" : value === "99999" ? "error" : "results");
    }, 650);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ZIP.test(zip)) {
      setFieldError(true);
      return;
    }
    setFieldError(false);
    run(zip);
  };

  const errId = `${uid}-err`;
  const helpId = `${uid}-help`;
  const showList = status === "sample" || status === "results";

  return (
    <section id={dealers.id} aria-labelledby="dealer-title" className="section" data-surface="paper">
      <div className="grid-12 gap-y-4">
        <Reveal className="col-span-12">
          <SectionHead id="dealer-title" eyebrow={dealers.eyebrow} title={dealers.title} lead={dealers.lead} />
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-5">
          <form onSubmit={submit} noValidate className="flex flex-col gap-1">
            <Label htmlFor={`${uid}-zip`}>{dealers.zip.label}</Label>
            <div className="flex gap-1">
              <Input
                id={`${uid}-zip`}
                name="zip"
                value={zip}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder={dealers.zip.placeholder}
                aria-invalid={fieldError}
                aria-describedby={fieldError ? `${errId} ${helpId}` : helpId}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                  if (fieldError) setFieldError(false);
                }}
              />
              <Button type="submit" loading={status === "loading"} className="shrink-0">
                {status === "loading" ? dealers.zip.loading : dealers.zip.button}
              </Button>
            </div>
            <p id={helpId} className="t-small text-muted">
              {dealers.zip.help}
            </p>
            <p id={errId} role="alert" className={cn("t-small flex items-center gap-0.5 font-medium text-ink", !fieldError && "hidden")}>
              <CircleAlert className="size-[16px] text-red" aria-hidden="true" />
              {fieldError && dealers.zip.error}
            </p>
          </form>

          <div className="mt-3" aria-live="polite" aria-busy={status === "loading"}>
            {status === "loading" && (
              <ul className="m-0 flex list-none flex-col gap-1 p-0" aria-label="Loading dealers">
                {[0, 1, 2].map((i) => (
                  <li key={i}>
                    <Skeleton className="h-[120px]" />
                  </li>
                ))}
              </ul>
            )}

            {showList && (
              <>
                <p className="t-eyebrow mb-1 text-muted">{status === "sample" ? dealers.sampleLabel : dealers.resultsFor(searched)}</p>
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {dealers.list.map((d, i) => (
                    <li key={d.id}>
                      <div
                        onMouseEnter={() => setActive(d.id)}
                        onFocus={() => setActive(d.id)}
                        data-active={active === d.id}
                        className="rounded-card border border-line bg-white p-2 text-ink transition-colors duration-200 ease-out hover:border-ink data-[active=true]:border-ink"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="headline t-h3">
                            <span className="sr-only">{i + 1}. </span>
                            {d.name}
                          </h3>
                          <span className="t-small shrink-0 font-medium">{d.distance}</span>
                        </div>
                        <p className="t-small text-muted">{d.address}</p>
                        <p className="t-small">{d.status}</p>
                        <div className="mt-1 flex gap-2">
                          <a href="#dealer" className="t-small inline-flex min-h-5 items-center gap-0.5 font-medium underline decoration-1 underline-offset-[6px] hover:decoration-2">
                            <Navigation className="size-[16px]" aria-hidden="true" />
                            {dealers.actions.directions}
                            <span className="sr-only"> to {d.name}</span>
                          </a>
                          <a href={`tel:${d.phone.replace(/\D/g, "")}`} className="t-small inline-flex min-h-5 items-center gap-0.5 font-medium underline decoration-1 underline-offset-[6px] hover:decoration-2">
                            <Phone className="size-[16px]" aria-hidden="true" />
                            {dealers.actions.call} {d.phone}
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {status === "empty" && (
              <div className="flex flex-col items-start gap-1 rounded-card border border-dashed border-steel bg-white p-3">
                <SearchX className="size-[32px]" aria-hidden="true" />
                <h3 className="headline t-h3">{dealers.empty.title}</h3>
                <p className="t-body text-muted">{dealers.empty.body}</p>
              </div>
            )}

            {status === "error" && (
              <div role="alert" className="flex flex-col items-start gap-1 rounded-card border-2 border-ink bg-white p-3">
                <CircleAlert className="size-[32px]" aria-hidden="true" />
                <h3 className="headline t-h3">{dealers.failure.title}</h3>
                <p className="t-body text-muted">{dealers.failure.body}</p>
                <Button variant="outline" size="sm" onClick={() => run(searched)}>
                  {dealers.failure.action}
                </Button>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-7">
          <div
            role="group"
            aria-label={dealers.mapLabel}
            data-surface="dark"
            className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line bg-surface text-fg lg:aspect-auto lg:h-full lg:min-h-[480px]"
          >
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <g stroke="var(--line-dark)" strokeWidth="0.25" fill="none" vectorEffect="non-scaling-stroke">
                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((n) => (
                  <g key={n}>
                    <line x1={n} y1="0" x2={n} y2="100" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1={n} x2="100" y2={n} vectorEffect="non-scaling-stroke" />
                  </g>
                ))}
              </g>
              <g stroke="var(--steel)" strokeWidth="1.2" fill="none" strokeLinecap="round">
                <path d="M0 62 C 25 58, 40 40, 100 34" vectorEffect="non-scaling-stroke" />
                <path d="M30 0 C 34 30, 52 52, 58 100" vectorEffect="non-scaling-stroke" />
                <path d="M0 18 L 100 82" vectorEffect="non-scaling-stroke" />
              </g>
            </svg>
            {showList &&
              dealers.list.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActive(d.id)}
                  aria-pressed={active === d.id}
                  aria-label={`Dealer ${i + 1}: ${d.name}`}
                  style={{ left: `${d.pin.x}%`, top: `${d.pin.y}%` }}
                  className={cn(
                    "absolute inline-flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border text-small font-semibold transition-colors duration-200 ease-out",
                    active === d.id ? "border-red bg-red text-white" : "border-white bg-white text-ink hover:bg-mist",
                  )}
                >
                  {i + 1}
                </button>
              ))}
            <p className="t-small absolute bottom-2 left-2 rounded-pill border border-line bg-surface px-1.5 py-0.5 text-muted">{dealers.mapLabel}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
