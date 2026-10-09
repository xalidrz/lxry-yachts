import { Accessibility, BadgeCheck, BadgeDollarSign, MessagesSquare, Star, UserRound } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/motion";
import { site } from "@/config/site";

export function TrustStrip() {
  const items = [
    {
      icon: Star,
      content: (
        <>
          <CountUp to={site.rating.value} decimals={1} />
          <span className="font-sans text-[0.8em]">★</span>
        </>
      ),
      label: "Google rating",
    },
    {
      icon: MessagesSquare,
      content: <CountUp to={site.rating.count} />,
      label: "Google reviews",
    },
    { icon: BadgeCheck, content: "Honest", label: "work" },
    { icon: BadgeDollarSign, content: "Fair", label: "pricing" },
    { icon: UserRound, content: "Owner-run", label: `by ${site.owner}` },
    { icon: Accessibility, content: "Wheelchair", label: "accessible" },
  ];

  return (
    <section aria-label="Why customers trust us" className="border-y border-white/10 bg-surface">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-5 py-10 sm:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {items.map((it, i) => (
          <Reveal as="li" index={i} key={it.label}>
            <div className="flex items-start gap-3">
              <it.icon className="mt-1 size-6 shrink-0 text-signal" aria-hidden />
              <div>
                <p className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-ink">
                  {it.content}
                </p>
                <p className="mt-1.5 text-sm text-muted">{it.label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
