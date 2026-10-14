import { useId } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function ConsentCheck({ dark, name = "datenschutz" }: { dark?: boolean; name?: string }) {
  const { t } = useI18n();
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <Checkbox id={id} name={name} required className={cn("mt-0.5", dark && "border-white bg-transparent data-[state=checked]:bg-brand data-[state=checked]:text-ink")} />
      <label htmlFor={id} className={cn("text-sm leading-snug", dark ? "text-white/85" : "text-grey")}>
        {t.forms.consent.before}
        <Link to="/datenschutz" lang="de" className={cn("underline underline-offset-2", dark ? "text-white hover:text-brand" : "text-ink hover:text-brand-ink")}>
          {t.forms.consent.link}
        </Link>
        {t.forms.consent.after}
      </label>
    </div>
  );
}
