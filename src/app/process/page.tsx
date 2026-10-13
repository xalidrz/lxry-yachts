import { Process } from "@/components/sections/process";
import { Tracker } from "@/components/sections/tracker";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How a Repair Works",
  description: "Five steps from drop-off to pick-up at Elite Motorsports in Hayward, CA, plus a concept demo of a repair tracker.",
  path: "/process",
  alt: heroPhoto.alt,
});

export default function ProcessPage() {
  return (
    <>
      <Process h1 />
      <Tracker />
    </>
  );
}
