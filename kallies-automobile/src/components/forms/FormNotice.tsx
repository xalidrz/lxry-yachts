import { CheckCircle2, TriangleAlert } from "lucide-react";
import { site } from "@/data/site";
import type { LeadResult } from "@/lib/forms";
import { cn } from "@/lib/utils";

export function FormNotice({ result, error, dark }: { result: LeadResult | null; error?: string | null; dark?: boolean }) {
  if (!result && !error) return null;
  const Icon = error ? TriangleAlert : CheckCircle2;
  return (
    <div role="status" className={cn("flex items-start gap-3 rounded-lg border p-4 text-sm", dark ? "border-white/20 text-white" : "border-line bg-white text-ink")}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", dark ? "text-brand" : "text-brand-ink")} aria-hidden />
      <p>
        {error
          ? `${error} Bitte versuchen Sie es erneut oder rufen Sie uns an: ${site.phone}.`
          : result === "sent"
            ? "Vielen Dank! Ihre Anfrage ist bei uns eingegangen – wir melden uns zeitnah."
            : `Ihr E-Mail-Programm wurde mit Ihrer Anfrage geöffnet. Bitte senden Sie die Nachricht dort ab – oder schreiben Sie an ${site.email}.`}
      </p>
    </div>
  );
}
