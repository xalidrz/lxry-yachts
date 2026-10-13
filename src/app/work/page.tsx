import { Gallery } from "@/components/sections/gallery";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Work",
  description: "Photos from inside Elite Motorsports in Hayward, CA: engines, wiring, lifts and the cars we work on.",
  path: "/work",
  alt: heroPhoto.alt,
});

export default function Page() {
  return <Gallery h1 />;
}
