import { Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { Accent } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export function NotFound() {
  usePageMeta(null);
  return (
    <PageHero
      crumb="Page not found"
      eyebrow="Error 404"
      title={
        <>
          This page has <Accent>lost power</Accent>
        </>
      }
      intro="We couldn't find the page you were looking for. Head back to the home page, or get in touch and we'll help."
    >
      <Button asChild size="lg">
        <Link to="/">
          <HomeIcon /> Back to home
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <Link to="/contact">Contact us</Link>
      </Button>
    </PageHero>
  );
}
