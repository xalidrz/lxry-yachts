import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MapPin, Navigation, Phone, TriangleAlert } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mapEmbedSrc, mapLink, site, telHref } from "@/lib/site";

const services = ["Electrical", "Wedding Lighting", "Both"] as const;
type Status = "idle" | "sending" | "sent" | "mailto" | "error" | "unconfigured";
type Errors = Partial<Record<"name" | "phone" | "email" | "service", string>>;

const today = new Date().toISOString().slice(0, 10);

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="text-sm text-[#ff6b75]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const uid = useId();
  const [service, setService] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const id = (n: string) => `${uid}-${n}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) return; // honeypot
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const data = { name: v("name"), phone: v("phone"), email: v("email"), service, eventDate: v("eventDate"), message: v("message") };

    const next: Errors = {};
    if (data.name.length < 2) next.name = "Please enter your name.";
    if (data.phone.replace(/\D/g, "").length < 10) next.phone = "Please enter a phone number with area code.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) next.email = "Please enter a valid email address.";
    if (!service) next.service = "Please choose a service.";
    setErrors(next);
    if (Object.keys(next).length) {
      (document.getElementById(id(Object.keys(next)[0])) as HTMLElement | null)?.focus();
      return;
    }

    const summary = [
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Service: ${data.service}`,
      data.eventDate && `Event date: ${data.eventDate}`,
      data.message && `\n${data.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (site.formEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `Quote request — ${data.service} — ${data.name}` }),
        });
        setStatus(res.ok ? "sent" : "error");
        if (res.ok) (e.target as HTMLFormElement).reset();
        if (res.ok) setService("");
      } catch {
        setStatus("error");
      }
    } else if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Quote request — ${data.service}`)}&body=${encodeURIComponent(summary)}`;
      setStatus("mailto");
    } else {
      setStatus("unconfigured");
    }
  }

  const describe = (n: keyof Errors) => (errors[n] ? `${id(n)}-err` : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div aria-hidden className="absolute -right-40 top-20 size-[520px] rounded-full bg-volt/[0.08] blur-[120px]" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Contact"
          title={
            <span id="contact-title">
              Get your <Accent>free quote</Accent>
            </span>
          }
          intro="Tell us about your electrical job or your event. We'll call you back to arrange a free site visit."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <Reveal>
            <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-white/10 bg-surface p-6 md:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={id("name")} label="Name" error={errors.name}>
                  <Input id={id("name")} name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={describe("name")} placeholder="Your full name" />
                </Field>
                <Field id={id("phone")} label="Phone" error={errors.phone}>
                  <Input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!errors.phone} aria-describedby={describe("phone")} placeholder="780-555-0123" />
                </Field>
                <Field id={id("email")} label="Email" error={errors.email}>
                  <Input id={id("email")} name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={describe("email")} placeholder="you@example.com" />
                </Field>
                <Field id={id("service")} label="Service" error={errors.service}>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger id={id("service")} aria-invalid={!!errors.service} aria-describedby={describe("service")}>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="sm:col-span-2">
                  <Field id={id("eventDate")} label="Event date (optional)">
                    <Input id={id("eventDate")} name="eventDate" type="date" min={today} className="[color-scheme:dark]" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id={id("message")} label="Message">
                    <Textarea id={id("message")} name="message" placeholder="Tell us about the job or the event — location, size, anything that helps." />
                  </Field>
                </div>
                {/* honeypot: hidden from people, tempting to bots */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company <input name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
              </div>

              <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending…
                  </>
                ) : (
                  "Send my request"
                )}
              </Button>

              <div aria-live="polite" className="mt-5 empty:hidden">
                {status === "sent" && (
                  <p className="flex items-start gap-3 rounded-lg border border-volt/40 bg-volt/10 p-4 text-[0.97rem]">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-volt-light" /> Thank you — your request is in. We'll get back to you shortly.
                  </p>
                )}
                {status === "mailto" && (
                  <p className="flex items-start gap-3 rounded-lg border border-volt/40 bg-volt/10 p-4 text-[0.97rem]">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-volt-light" /> Your email app should have opened with your request ready to send. If it didn't, please call us on{" "}
                    <a className="underline" href={telHref}>
                      {site.phoneDisplay}
                    </a>
                    .
                  </p>
                )}
                {(status === "error" || status === "unconfigured") && (
                  <p className="flex items-start gap-3 rounded-lg border border-brandred/60 bg-brandred/10 p-4 text-[0.97rem]">
                    <TriangleAlert className="mt-0.5 size-5 shrink-0 text-[#ff6b75]" />
                    <span>
                      {status === "error" ? "Sorry — we couldn't send that just now." : "Online requests aren't switched on yet."} Please call us on{" "}
                      <a className="font-semibold underline" href={telHref}>
                        {site.phoneDisplay}
                      </a>{" "}
                      and we'll sort out your quote right away.
                    </span>
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.12} className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-surface p-6 md:p-8">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-volt/40 bg-volt/10 text-volt-light">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="label text-[0.82rem] text-muted-foreground">Phone</p>
                    <a href={telHref} className="font-heading text-[1.4rem] transition-colors hover:text-volt-light">
                      {site.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-volt/40 bg-volt/10 text-volt-light">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="label text-[0.82rem] text-muted-foreground">Address</p>
                    <address className="not-italic leading-snug">
                      {site.addressLines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                    <a href={mapLink} target="_blank" rel="noopener noreferrer" className="label mt-2 inline-flex items-center gap-2 text-[0.88rem] text-volt-light hover:underline">
                      <Navigation className="size-4" /> Get directions<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
              <iframe title={`Map showing ${site.addressOneLine}`} src={mapEmbedSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="map-dark block h-[300px] w-full border-0 md:h-[340px]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
