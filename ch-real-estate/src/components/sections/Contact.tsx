import { useEffect, useState } from "react";
import { CheckCircle2, Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { mapEmbedSrc, mapLink, site, whatsappLink } from "@/lib/site";

export interface Prefill {
  interest?: string;
  message?: string;
  /** Changes on every request so repeated clicks re-apply the same values. */
  nonce: number;
}

const interests = ["Buy", "Rent", "Sell", "Construction"];

const details = [
  { icon: Phone, label: "Call us", value: site.phoneDisplay, href: `tel:${site.phoneTel}` },
  { icon: MessageCircle, label: "WhatsApp", value: site.phoneDisplay, href: whatsappLink(), external: true },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: "Office hours", value: site.hours },
];

type Errors = Partial<Record<"name" | "phone" | "interest", string>>;

export function Contact({ prefill }: { prefill: Prefill }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!prefill.nonce) return;
    if (prefill.interest) setInterest(prefill.interest);
    if (prefill.message !== undefined) setMessage(prefill.message);
    setSent(false);
  }, [prefill]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 14) e.phone = "Enter a valid phone number, e.g. 0334 1234567.";
    if (!interest) e.interest = "Please choose what you are interested in.";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const text = [
      `New enquiry — ${site.name}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Interested in: ${interest}`,
      message.trim() && `Message: ${message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const reset = () => {
    setName("");
    setPhone("");
    setInterest("");
    setMessage("");
    setErrors({});
    setSent(false);
  };

  const errId = (k: string) => `err-${k}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-ink py-28">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title={
            <>
              Let's find or build <Gold>your next address</Gold>
            </>
          }
          description="Tell us what you need and we will come back to you the same day. Prefer to talk? Call or message us directly."
        />

        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <Reveal>
            <div className="h-full border border-gold/25 bg-surface p-7 sm:p-10">
              {sent ? (
                <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center" role="status">
                  <CheckCircle2 className="mb-6 size-14 text-gold" strokeWidth={1.3} />
                  <h3 className="text-3xl">Thank you, {name.trim().split(" ")[0]}.</h3>
                  <p className="mt-4 max-w-sm text-muted-foreground">
                    Your enquiry has opened in WhatsApp — just press send and our team will reply shortly. If nothing
                    opened, call us on{" "}
                    <a className="text-gold-light" href={`tel:${site.phoneTel}`}>
                      {site.phoneDisplay}
                    </a>
                    .
                  </p>
                  <Button variant="outline" className="mt-8" onClick={reset}>
                    Send another enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cf-name">Name</Label>
                    <Input
                      id="cf-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? errId("name") : undefined}
                    />
                    {errors.name && (
                      <p id={errId("name")} className="text-sm text-gold-light">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cf-phone">Phone</Label>
                    <Input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="03XX XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? errId("phone") : undefined}
                    />
                    {errors.phone && (
                      <p id={errId("phone")} className="text-sm text-gold-light">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cf-interest">Interested In</Label>
                    <Select value={interest} onValueChange={setInterest}>
                      <SelectTrigger id="cf-interest" aria-invalid={!!errors.interest}>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {interests.map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.interest && <p className="text-sm text-gold-light">{errors.interest}</p>}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cf-message">Message</Label>
                    <Textarea
                      id="cf-message"
                      name="message"
                      placeholder="Tell us about the property, plot size, budget or what you would like to build…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      <Send /> Send Enquiry
                    </Button>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Submitting opens WhatsApp with your enquiry pre-filled, so we can reply to you directly.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full border border-gold/25 bg-surface p-7 sm:p-10">
              <h3 className="mb-8 text-2xl">Get in touch</h3>
              <ul className="space-y-6">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-5">
                    <span className="flex size-12 shrink-0 items-center justify-center border border-gold/35 text-gold">
                      <d.icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="label text-[0.78rem] text-muted-foreground">{d.label}</p>
                      {d.href ? (
                        <a
                          href={d.href}
                          {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="break-words text-[1.05rem] text-cream transition-colors hover:text-gold-light"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-[1.05rem] text-cream">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center border border-gold/35 text-gold">
                    <MapPin className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="label text-[0.78rem] text-muted-foreground">Office address</p>
                    <address className="text-[1.05rem] not-italic leading-relaxed text-cream">
                      {site.addressLines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10" delay={0.1}>
          <div className="relative border border-gold/25 bg-surface">
            <iframe
              title="CH Real Estate & Builder's office location on Google Maps"
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[360px] w-full border-0 sm:h-[440px]"
              // dark-theme the light map tiles without introducing any other colour
              style={{ filter: "grayscale(1) invert(0.92) contrast(0.9) brightness(0.95)" }}
            />
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="label absolute bottom-4 left-4 flex items-center gap-2 border border-gold/50 bg-ink/90 px-4 py-2.5 text-[0.85rem] text-gold-light backdrop-blur transition-colors hover:bg-gold hover:text-ink"
            >
              Open in Google Maps <ExternalLink className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
