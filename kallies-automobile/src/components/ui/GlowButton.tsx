import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "./glow-button.css";

interface Props {
  /** Pass a single element (e.g. a router <Link>) whose children are the label; it receives the button styling. */
  children: ReactElement<{ className?: string; children?: ReactNode }>;
  className?: string;
}

/** Hexagon button with a dim orange border; on hover a bright arc travels once around it (see glow-button.css). */
export function GlowButton({ children, className }: Props) {
  if (!isValidElement(children)) return null;
  return cloneElement(
    children,
    { className: cn("gbtn", className, children.props.className) },
    <>
      <i className="gbtn-ring" aria-hidden />
      <i className="gbtn-fill" aria-hidden />
      <i className="gbtn-halo" aria-hidden />
      <i className="gbtn-arc" aria-hidden />
      <span className="gbtn-badge" aria-hidden>
        <ArrowRight />
      </span>
      <span>{children.props.children}</span>
    </>,
  );
}
