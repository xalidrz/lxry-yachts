import { Location } from "@/components/sections/location";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Location and Directions: 70 W Jackson St, Hayward",
  description: "Find Elite Motorsports at 70 W Jackson St, Hayward, CA 94544. Map, hours, parking and accessibility. Call (510) 363-8275.",
  path: "/location",
  alt: heroPhoto.alt,
});

export default function Page() {
  return <Location h1 />;
}
