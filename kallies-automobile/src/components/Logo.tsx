import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/** White logo on dark surfaces (header, footer); the original colour-on-light file elsewhere. */
export function Logo({ variant = "white", className }: { variant?: "white" | "dark"; className?: string }) {
  const { t } = useI18n();
  return (
    <Link to="/" aria-label={t.header.home} className={cn("inline-flex shrink-0", className)}>
      <img
        src={variant === "white" ? "/images/logo-white.png" : "/images/logo-dark.png"}
        alt="Kallies Automobile"
        translate="no"
        width={180}
        height={60}
        className="h-10 w-auto md:h-12"
      />
    </Link>
  );
}
