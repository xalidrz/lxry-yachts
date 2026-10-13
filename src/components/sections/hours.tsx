import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { DayNight, HoursClock } from "@/components/hours-clock";
import { site } from "@/config/site";

/** 06: the 24-hour clock. The week table lives on the Location page and the summary in the footer. */
export function Hours({ h1 = false }: { h1?: boolean }) {
  return (
    <section id="hours" className="grid-lines border-b border-line bg-graphite pb-16 pt-6 sm:pb-24 sm:pt-8">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-8">
        <div className="space-y-8">
          <SectionHead
            n="07"
            title="Hours"
            as={h1 ? "h1" : "h2"}
            intro="Red on the clock is when the shop is open. The needle follows Pacific time, the shop’s local time, wherever you are."
          />
          <Reveal index={1} className="space-y-6">
            <p className="max-w-md text-sm leading-relaxed text-ink/85">
              {site.profile.appointments}. Pick a day and a time window and {site.owner} will text you back.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/book" label="Request a time" />
              <Button href="/location" variant="outline" label="Full week" />
            </div>
            <DayNight />
          </Reveal>
        </div>
        <div className="lg:justify-self-end">
          <HoursClock />
        </div>
      </div>
    </section>
  );
}
