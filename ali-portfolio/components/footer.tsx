import { EMAIL, MAILTO_URL, WHATSAPP_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <p>© 2026 Ali. All rights reserved.</p>
        <p className="flex items-center gap-5">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            WhatsApp
          </a>
          <a href={MAILTO_URL} className="hover:text-foreground">
            {EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}
