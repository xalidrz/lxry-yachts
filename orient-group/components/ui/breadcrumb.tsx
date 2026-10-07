import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

function Breadcrumb({ "aria-label": label = "Breadcrumb", ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label={label} data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm text-on-dark-muted sm:gap-2",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5 sm:gap-2", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-semibold text-on-dark", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("text-on-dark-muted [&>svg]:size-3.5 rtl:[&>svg]:-scale-x-100", className)}
      {...props}
    >
      <ChevronRight />
    </li>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
