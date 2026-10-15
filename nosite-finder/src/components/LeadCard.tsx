import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Check, Copy, MapPin, MessageCircle, Phone, ShieldCheck, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusSelect } from "@/components/StatusSelect";
import { removeLead, saveLead, setLeadStatus } from "@/lib/leads";
import { buildPitch, copyText } from "@/lib/pitch";
import { telHref, whatsappHref } from "@/lib/phone";
import type { Business, Lead, LeadStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function verifyHref(b: Pick<Business, "name" | "city">): string {
  return `https://www.google.com/search?q=${encodeURIComponent(`${b.name} ${b.city}`)}`;
}

interface Props {
  business: Business;
  lead?: Lead;
  /** "lead" = shown on My Leads (the bookmark becomes a remove button). */
  mode?: "result" | "lead";
}

export function LeadCard({ business: b, lead, mode = "result" }: Props) {
  const [copied, setCopied] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    if (!confirmRemove) return;
    const t = setTimeout(() => setConfirmRemove(false), 3500);
    return () => clearTimeout(t);
  }, [confirmRemove]);

  const status: LeadStatus = lead?.status ?? "New";
  const pitch = buildPitch(b.name);
  const wa = b.phone ? whatsappHref(b.phone, b.countryCode, pitch) : null;

  return (
    <Card className="flex flex-col gap-4 p-4 transition-shadow hover:shadow-lift sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-xl font-bold leading-tight">{b.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{b.category}</Badge>
            {b.distanceKm !== undefined && <Badge variant="muted">{b.distanceKm < 10 ? b.distanceKm.toFixed(1) : Math.round(b.distanceKm)} km away</Badge>}
          </div>
        </div>

        {mode === "result" ? (
          <Button
            variant={lead ? "secondary" : "outline"}
            size="icon"
            className={cn("shrink-0", lead && "text-primary")}
            aria-pressed={!!lead}
            aria-label={lead ? "Saved to My Leads. Tap to remove" : "Save to My Leads"}
            title={lead ? "Saved. Tap to remove" : "Save to My Leads"}
            onClick={() => (lead ? removeLead(b.id) : saveLead(b))}
          >
            {lead ? <BookmarkCheck /> : <Bookmark />}
          </Button>
        ) : (
          <Button
            variant={confirmRemove ? "destructive" : "ghost"}
            size={confirmRemove ? "sm" : "icon"}
            className="shrink-0"
            aria-label="Remove lead"
            onClick={() => (confirmRemove ? removeLead(b.id) : setConfirmRemove(true))}
          >
            <Trash2 />
            {confirmRemove && "Remove?"}
          </Button>
        )}
      </div>

      <dl className="flex flex-col gap-2 text-base">
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Address</dt>
          <MapPin className="mt-1 size-[18px] shrink-0 text-muted-foreground" aria-hidden />
          <dd className={cn("min-w-0 break-words", !b.address && "text-muted-foreground")}>{b.address ?? "No address listed"}</dd>
        </div>
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Phone</dt>
          <Phone className="mt-1 size-[18px] shrink-0 text-muted-foreground" aria-hidden />
          <dd className={cn(!b.phone && "text-muted-foreground")}>
            {b.phone ? (
              <a href={telHref(b.phone)} className="font-medium underline decoration-border underline-offset-4 hover:decoration-primary">
                {b.phone}
              </a>
            ) : (
              "No phone listed - Verify to find one"
            )}
          </dd>
        </div>
      </dl>

      <div className="grid grid-cols-2 gap-2">
        {b.phone ? (
          <a href={telHref(b.phone)} className={buttonVariants({ variant: "default" })}>
            <Phone /> Call
          </a>
        ) : (
          <Button disabled>
            <Phone /> Call
          </Button>
        )}
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
            <MessageCircle /> WhatsApp
          </a>
        ) : (
          <Button variant="outline" disabled title={b.phone ? "Can't tell the country code for this number" : "No phone number"}>
            <MessageCircle /> WhatsApp
          </Button>
        )}
        <a href={verifyHref(b)} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })} title="Search Google to check they really have no website">
          <ShieldCheck /> Verify
        </a>
        <Button
          variant="outline"
          onClick={async () => setCopied(await copyText(pitch))}
          aria-live="polite"
        >
          {copied ? <Check className="text-primary" /> : <Copy />}
          {copied ? "Copied" : "Copy pitch"}
        </Button>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-muted-foreground">Lead status{!lead && " (saves the lead)"}</span>
        <StatusSelect value={status} saved={!!lead} onChange={(s) => setLeadStatus(b, s)} />
      </div>
    </Card>
  );
}
