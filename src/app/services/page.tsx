import { Services } from "@/components/sections/services";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description: "Uber inspections, oil changes, engine diagnostics and misfire repair, auto electrical, clutch replacement and mirror repair at Elite Motorsports in Hayward, CA.",
  path: "/services",
  alt: heroPhoto.alt,
});

export default function Page() {
  return <Services h1 />;
}
