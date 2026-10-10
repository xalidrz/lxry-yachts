import { PageHeader } from "@/components/page-header";
import { BookingForm } from "@/components/booking/booking-form";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Book an Appointment",
  description: `Request an appointment at Elite Motorsports in Hayward, CA. Open Mon–Fri 9 AM – 5 PM. ${site.profile.appointments}.`,
  path: "/book",
  alt: heroPhoto.alt,
});

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book"
        title="Request an appointment"
        intro={`${site.profile.appointments}. Pick a day and a time window, and ${site.owner} will text you to confirm.`}
      />
      <section className="bg-carbon py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
