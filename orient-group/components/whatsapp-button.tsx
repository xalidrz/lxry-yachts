import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Props = {
  message: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg";
  /** Extra accessible name when the visible text is not enough on its own. */
  ariaLabel?: string;
};

/** Green WhatsApp pill that opens a chat with the message pre-filled. */
export function WhatsAppButton({
  message,
  children,
  className,
  size,
  ariaLabel,
}: Props) {
  return (
    <Button asChild variant="whatsapp" size={size} className={cn(className)}>
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        <MessageCircle aria-hidden="true" />
        {children}
      </a>
    </Button>
  );
}
