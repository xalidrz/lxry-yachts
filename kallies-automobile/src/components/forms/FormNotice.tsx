import { CheckCircle2, TriangleAlert } from "lucide-react";
import { site } from "@/data/site";
import { useI18n } from "@/i18n";
import type { LeadResult } from "@/lib/forms";
import { cn } from "@/lib/utils";

export function FormNotice({ result, error, dark }: { result: LeadResult | null; error?: string | null; dark?: boolean }) {
  const { t } = useI18n();
  if (!result && !error) return null;
  const Icon = error ? TriangleAlert : CheckCircle2;
  return (
    <div role="status" className={cn("flex items-start gap-3 rounded-lg border p-4 text-sm", dark ? "border-white/20 text-white" : "border-line bg-white text-ink")}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", dark ? "text-brand" : "text-brand-ink")} aria-hidden />
      <p>{error ? t.forms.error(error, site.phone) : result === "sent" ? t.forms.sent : t.forms.mailto(site.email)}</p>
    </div>
  );
}
