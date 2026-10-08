import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gold } from "@/components/SectionHeading";
import { usePageMeta } from "@/lib/seo";

export default function NotFound() {
  usePageMeta("/", { title: "Page not found | CH Real Estate & Builder's", description: "The page you are looking for could not be found." });
  // keep missing pages out of search results
  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return (
    <section className="flex min-h-[80vh] items-center bg-ink pb-24 pt-40">
      <div className="container text-center">
        <p className="label text-sm text-gold">Error 404</p>
        <h1 className="mt-5 text-[clamp(2.4rem,6vw,4.5rem)] text-cream">
          This page <Gold>wasn't found</Gold>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
          The link may be broken or the property may no longer be listed. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/">
              Back to home <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/buy">Browse properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
