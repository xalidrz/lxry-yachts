import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  /** Icon after the label. Defaults to an arrow that nudges right on hover; pass null for none. */
  icon?: React.ReactNode | null;
  className?: string;
};

type AnchorProps = Props & Omit<React.ComponentProps<"a">, keyof Props | "children"> & { href: string };
type ButtonProps = Props & Omit<React.ComponentProps<"button">, keyof Props | "children"> & { href?: undefined };

/**
 * One button for the whole site. The label is stacked twice so it slides up on hover,
 * the arrow nudges right and a red fill sweeps in from the left. All motion lives in
 * the `.btn` rules in globals.css and is switched off for reduced motion.
 */
export function Button(props: AnchorProps | ButtonProps) {
  const { label, variant = "primary", size = "md", icon, className, ...rest } = props;
  const classes = cn("btn", variant === "primary" ? "btn-primary" : "btn-outline", size === "sm" && "btn-sm", className);
  const inner = (
    <>
      <span className="btn-fill" aria-hidden />
      <span className="btn-text">
        <span>{label}</span>
        <span aria-hidden>{label}</span>
      </span>
      {icon === undefined ? <ArrowRight className="btn-arrow" aria-hidden /> : icon}
    </>
  );
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as Omit<AnchorProps, keyof Props>;
    return (
      <a href={href} className={classes} {...anchor}>
        {inner}
      </a>
    );
  }
  const { ...button } = rest as Omit<ButtonProps, keyof Props>;
  return (
    <button className={classes} {...button}>
      {inner}
    </button>
  );
}
