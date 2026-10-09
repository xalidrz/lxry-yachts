import { PageHeader } from "@/components/page-header";
import { Location } from "@/components/location";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Location and Directions: 70 W Jackson St, Hayward",
  description:
    "Find Elite Motorsports at 70 W Jackson St, Hayward, CA 94544. Wheelchair accessible. Get directions or call (510) 363-8275.",
  path: "/location",
  alt: heroPhoto.alt,
});

export default function LocationPage() {
  return (
    <>
      <PageHeader eyebrow="Location" title="Find the shop" />
      <Location />
    </>
  );
}
