"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const stages = ["Checked in", "Diagnosing", "Waiting approval", "In repair", "Ready for pick-up"] as const;
const STEP_MS = 1100;
const ORDER = /^EM-\d{4}$/;

const field =
  "mt-2 block h-12 w-full border border-line bg-graphite px-4 font-mono text-base uppercase text-ink placeholder:text-muted/60 focus:border-signal";
const label = "block font-mono text-xs uppercase tracking-[0.2em] text-muted";

/** Concept demo: everything happens in this component's state. Nothing is sent anywhere. */
export function Tracker() {
  const [order, setOrder] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [errors, setErrors] = useState<{ order?: string; vehicle?: string }>({});
  const [stage, setStage] = useState(-1);
  const [shown, setShown] = useState({ order: "", vehicle: "" });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const running = stage >= 0 && stage < stages.length - 1;
  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);

  const simulate = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!ORDER.test(order.trim().toUpperCase())) next.order = "Use the format EM-0000, for example EM-1234.";
    if (!vehicle.trim()) next.vehicle = "Enter a make and model.";
    setErrors(next);
    if (Object.keys(next).length) return;

    if (timer.current) clearInterval(timer.current);
    setShown({ order: order.trim().toUpperCase(), vehicle: vehicle.trim() });
    setStage(0);
    timer.current = setInterval(() => {
      setStage((s) => {
        if (s >= stages.length - 1) {
          if (timer.current) clearInterval(timer.current);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
  };

  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    setStage(-1);
  };

  const done = stage === stages.length - 1;

  return (
    <section id="demo" className="grid-lines border-b border-line bg-graphite pb-20 pt-6 sm:pb-28 sm:pt-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead n="05" title="Repair tracker" />
        <Reveal index={1} className="mt-5">
          <p className="inline-flex items-center gap-2.5 border border-signal px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-signal-bright">
            Concept · front-end demo only, nothing is sent
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <form onSubmit={simulate} noValidate className="space-y-6 border border-line bg-surface p-6 sm:p-8">
            <div>
              <label htmlFor="t-order" className={label}>
                Repair order number
              </label>
              <input
                id="t-order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="EM-0000"
                maxLength={7}
                autoComplete="off"
                className={field}
                aria-invalid={!!errors.order}
                aria-describedby={errors.order ? "t-order-err" : undefined}
              />
              {errors.order ? (
                <p id="t-order-err" className="mt-1.5 text-sm text-signal-bright">
                  {errors.order}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="t-vehicle" className={label}>
                Vehicle make / model
              </label>
              <input
                id="t-vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                autoComplete="off"
                className={cn(field, "normal-case")}
                aria-invalid={!!errors.vehicle}
                aria-describedby={errors.vehicle ? "t-vehicle-err" : undefined}
              />
              {errors.vehicle ? (
                <p id="t-vehicle-err" className="mt-1.5 text-sm text-signal-bright">
                  {errors.vehicle}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" label={running ? "Simulating" : "Simulate"} icon={<Play aria-hidden />} disabled={running} />
              {stage >= 0 ? (
                <Button type="button" variant="outline" label="Reset" icon={<RotateCcw aria-hidden />} onClick={reset} />
              ) : null}
            </div>
            <p className="text-sm text-muted">This is a design concept. It does not connect to any real repair order.</p>
          </form>

          <div className="border border-line bg-surface p-6 sm:p-8" aria-live="polite">
            <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span>{stage >= 0 ? `${shown.order} · ${shown.vehicle}` : "Awaiting simulation"}</span>
              <span className="text-ink">{stage >= 0 ? `${String(stage + 1).padStart(2, "0")}/05` : "00/05"}</span>
            </div>

            <ol className="mt-8 grid grid-cols-5 gap-1.5 sm:gap-2" aria-label="Repair stages">
              {stages.map((s, i) => (
                <li key={s} aria-current={i === stage ? "step" : undefined}>
                  <div className={cn("h-2", i <= stage ? "bg-signal" : "bg-line")} />
                  <p className={cn("mt-3 hidden font-mono text-[0.6875rem] uppercase leading-tight tracking-[0.12em] sm:block", i === stage ? "text-ink" : "text-muted")}>
                    {s}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-8 flex items-center gap-3 font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-ink sm:text-5xl">
              {done ? <span className="checker inline-block h-8 w-8 shrink-0 border border-line" aria-hidden /> : null}
              {stage >= 0 ? stages[stage] : "Status appears here"}
              {done ? <Check className="size-7 text-signal-bright" aria-hidden /> : null}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
