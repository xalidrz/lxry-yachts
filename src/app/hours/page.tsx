import { Hours } from "@/components/sections/hours";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Hours",
  description: "A live 24-hour clock for Elite Motorsports in Hayward, CA.",
  path: "/hours",
  alt: heroPhoto.alt,
});

export default function Page() {
  return <Hours h1 />;
}
