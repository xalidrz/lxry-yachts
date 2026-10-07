import Link from "next/link";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.href ? (
                <Link
                  href={item.href}
                  className="transition-colors duration-150 hover:text-on-dark"
                >
                  {item.label}
                </Link>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/** Dark charcoal title band that sits under the floating header on inner pages. */
export function PageHero({
  title,
  children,
  crumbs,
}: {
  title: string;
  children?: React.ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <section className="on-dark bg-charcoal pt-32 pb-12 text-on-dark sm:pt-36 sm:pb-14">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {crumbs && (
          <div className="mb-5">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <h1 className="font-display text-3xl leading-tight font-extrabold sm:text-5xl">
          {title}
        </h1>
        {children && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-on-dark-muted">
            {children}
          </p>
        )}
      </div>
    </section>
  );
}
