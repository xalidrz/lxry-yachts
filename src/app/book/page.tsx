import { BookingForm } from "@/components/booking/booking-form";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Request a Time",
  description: `Request an appointment at Elite Motorsports in Hayward, CA. Open Mon\u2013Fri 9 AM \u2013 5 PM. ${site.profile.appointments}.`,
  path: "/book",
  alt: heroPhoto.alt,
});

export default function BookPage() {
  return (
    <>
      <header className="grid-lines border-b border-line bg-graphite pb-12 pt-16 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-bright">Book —</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Request a time
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.profile.appointments}. Pick a day and a time window, and {site.owner} will text you to confirm.
          </p>
        </div>
      </header>
      <section className="bg-graphite py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
