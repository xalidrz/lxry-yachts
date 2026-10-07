import { notFound } from "next/navigation";

/** Any URL that matches no page: show the language-aware 404 inside the site layout. */
export default function CatchAll() {
  notFound();
}
