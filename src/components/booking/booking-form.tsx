"use client";

import { useEffect, useState } from "react";
import { Check, Copy, MessageSquare, Phone } from "lucide-react";
import { PearlButton } from "@/components/ui/pearl-button";
import { DatePicker } from "@/components/booking/date-picker";
import { closedNotice, timeSlots } from "@/data/booking";
import { visibleServices } from "@/data/services";
import { composeMessage, longDay, parseKey, slotsLeft, smsHref, type BookingInput } from "@/lib/booking";
import { shopNow } from "@/lib/hours";
import { useShopStatus } from "@/lib/use-shop-status";
import { links, site } from "@/config/site";
import { cn } from "@/lib/utils";

const NOT_SURE = "Not sure";
const field =
  "mt-2 block h-12 w-full rounded-xl border border-white/15 bg-carbon px-4 text-base text-ink placeholder:text-muted/70 focus:border-signal";
const label = "block font-display text-sm font-bold uppercase tracking-[0.2em] text-ink";

type Errors = Partial<Record<"name" | "phone" | "vehicle" | "date" | "slot", string>>;

export function BookingForm() {
  const status = useShopStatus();
  const [now, setNow] = useState<ReturnType<typeof shopNow> | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", vehicle: "", service: NOT_SURE, notes: "" });
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tick = () => setNow(shopNow());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const open = date ? slotsLeft(...(Object.values(parseKey(date)) as [number, number, number]), now ?? undefined) : [];
  // A time that has already ended today can't stay selected.
  const slotOk = !slot || open.some((s) => s.id === slot);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a phone number with area code.";
    if (!form.vehicle.trim()) next.vehicle = "Enter the year, make and model.";
    if (!date) next.date = "Pick a day.";
    if (!slot || !slotOk) next.slot = "Pick a time window.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const message = composeMessage({ ...form, date, slot } satisfies BookingInput);
    setSent(message);
    window.location.href = smsHref(message);
  };

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(sent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-6">
        <div>
          <label htmlFor="b-name" className={label}>
            Name
          </label>
          <input id="b-name" autoComplete="name" value={form.name} onChange={update("name")} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
          {errors.name ? <p id="e-name" className="mt-1.5 text-sm text-signal-bright">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="b-phone" className={label}>
            Phone
          </label>
          <input id="b-phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
          {errors.phone ? <p id="e-phone" className="mt-1.5 text-sm text-signal-bright">{errors.phone}</p> : null}
        </div>
        <div>
          <label htmlFor="b-vehicle" className={label}>
            Vehicle
          </label>
          <input id="b-vehicle" placeholder="Year, make, model" value={form.vehicle} onChange={update("vehicle")} className={field} aria-invalid={!!errors.vehicle} aria-describedby={errors.vehicle ? "e-vehicle" : undefined} />
          {errors.vehicle ? <p id="e-vehicle" className="mt-1.5 text-sm text-signal-bright">{errors.vehicle}</p> : null}
        </div>
        <div>
          <label htmlFor="b-service" className={label}>
            Service
          </label>
          <select id="b-service" value={form.service} onChange={update("service")} className={field}>
            {visibleServices.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value={NOT_SURE}>{NOT_SURE}</option>
          </select>
        </div>
        <div>
          <label htmlFor="b-notes" className={label}>
            Notes <span className="font-sans text-xs normal-case tracking-normal text-muted">(optional)</span>
          </label>
          <textarea id="b-notes" rows={3} value={form.notes} onChange={update("notes")} className={cn(field, "h-auto py-3")} />
        </div>
      </div>

      <div className="space-y-6">
        <fieldset>
          <legend className={label}>Day</legend>
          <p className="mt-1 text-sm text-muted">Open {`Mon–Fri`}. Saturdays and Sundays aren&rsquo;t available.</p>
          <div className="mt-3">
            {now ? (
              <DatePicker now={now} value={date} onChange={setDate} />
            ) : (
              <div className="h-[22rem] max-w-sm rounded-2xl border border-white/10 bg-carbon" aria-hidden />
            )}
          </div>
          {date ? <p className="mt-3 text-sm text-ink">{longDay(date)}</p> : null}
          {errors.date ? <p className="mt-1.5 text-sm text-signal-bright">{errors.date}</p> : null}
        </fieldset>

        <fieldset>
          <legend className={label}>Time</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {timeSlots.map((s) => {
              const disabled = !date || !open.some((o) => o.id === s.id);
              return (
                <label key={s.id} className={cn("block", disabled && "cursor-not-allowed")}>
                  <input
                    type="radio"
                    name="slot"
                    value={s.id}
                    checked={slot === s.id && !disabled}
                    disabled={disabled}
                    onChange={() => setSlot(s.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "block rounded-xl border border-white/15 bg-carbon px-4 py-3 text-center peer-checked:border-signal peer-checked:bg-signal/15 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-signal-bright",
                      disabled ? "text-muted/50" : "text-ink hover:border-white/40",
                    )}
                  >
                    <span className="block font-display text-base font-bold uppercase tracking-wide">{s.label}</span>
                    <span className="block text-sm text-muted">({s.range})</span>
                  </span>
                </label>
              );
            })}
          </div>
          {errors.slot ? <p className="mt-1.5 text-sm text-signal-bright">{errors.slot}</p> : null}
        </fieldset>

        <div>
          <PearlButton type="submit" className="w-full sm:w-auto">
            <MessageSquare className="size-4" aria-hidden />
            Send request by text
          </PearlButton>
          {status?.open === false ? (
            <p className="mt-3 text-sm text-ink" role="status">
              {closedNotice}
            </p>
          ) : null}
          <p className="mt-3 max-w-md text-sm text-muted">
            This opens your texting app with your request already written. Nothing is booked until {site.owner} texts you back.
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-white/15 bg-surface p-5" role="region" aria-label="Your request">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-signal">Didn&rsquo;t open your messages?</p>
            <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm text-ink/90">{sent}</pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <PearlButton type="button" variant="secondary" size="sm" onClick={copy}>
                {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                {copied ? "Copied" : "Copy message"}
              </PearlButton>
              <PearlButton asChild size="sm">
                <a href={links.tel}>
                  <Phone className="phone-icon size-4" aria-hidden />
                  Call {site.phone.display}
                </a>
              </PearlButton>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
