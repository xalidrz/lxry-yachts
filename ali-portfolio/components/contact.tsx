import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { EMAIL, MAILTO_URL, WHATSAPP_URL } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center text-background sm:px-12 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(37,99,235,0.35),transparent)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl lg:text-5xl">Have a business that needs a better website?</h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-zinc-400 sm:text-lg">
            Send me a message on WhatsApp. I reply fast, and the preview is free.
          </p>
          <Button asChild variant="whatsapp" size="lg" className="mt-9 h-16 px-10 text-lg">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-6" aria-hidden />
              WhatsApp me
            </a>
          </Button>
          <p className="mt-7 text-sm text-zinc-400">
            Prefer email?{" "}
            <a href={MAILTO_URL} className="inline-flex items-center gap-1.5 font-medium text-white underline underline-offset-4 hover:text-blue-300">
              <Mail className="size-4" aria-hidden />
              {EMAIL}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
