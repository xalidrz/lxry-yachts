import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrowserFrame } from "@/components/browser-frame";
import { Reveal } from "@/components/reveal";
import { WHATSAPP_URL, projects } from "@/lib/site";

const sizes = "(min-width: 1024px) 420px, 80vw";

export function Hero() {
  const [orient, , rbc, , dacha] = projects;

  return (
    <section id="top" className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_80%_0%,rgba(37,99,235,0.09),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-whatsapp opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-whatsapp" />
              </span>
              Web developer · Available for new projects
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
              I build fast, modern websites for businesses in the Gulf.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Clean design, mobile-first, English + Arabic, and WhatsApp built in so customers can reach you in one tap.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="default">
              <a href="#work">
                See my work
                <ArrowDown className="size-4" aria-hidden />
              </a>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" aria-hidden />
                WhatsApp me
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative mx-auto h-[330px] w-full max-w-[520px] sm:h-[440px] lg:h-[500px]" aria-hidden>
            <div className="float-a absolute left-0 top-0 w-[70%]">
              <div className="-rotate-6">
                <BrowserFrame src={dacha.image} alt="" url="dacha-psi-one.vercel.app" sizes={sizes} />
              </div>
            </div>
            <div className="float-b absolute right-0 top-[22%] w-[70%]">
              <div className="rotate-[5deg]">
                <BrowserFrame src={rbc.image} alt="" url="rbc-yachts.vercel.app" sizes={sizes} />
              </div>
            </div>
            <div className="float-a absolute bottom-0 left-[10%] w-[76%] [animation-delay:-3s]">
              <div className="-rotate-1">
                <BrowserFrame src={orient.image} alt="" url="orient-group-gulf.vercel.app" sizes={sizes} priority />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
