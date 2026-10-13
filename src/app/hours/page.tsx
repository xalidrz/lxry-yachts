import { Hours } from "@/components/sections/hours";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Hours",
  description: "Elite Motorsports hours dial, Google rating and customer reviews. Hayward, CA.",
  path: "/hours",
  alt: heroPhoto.alt,
});

export default function Page() {
  return <Hours h1 />;
}
