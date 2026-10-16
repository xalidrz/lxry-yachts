import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Root is intentionally `static` so the full-width viewport can anchor to the sticky <header>.
 */
export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} className={cn("static", className)} {...props}>
    {children}
    <div className="absolute left-0 top-full w-full">
      <NavigationMenuPrimitive.Viewport className="h-[var(--radix-navigation-menu-viewport-height)] w-full border-b border-line bg-white text-ink data-[state=closed]:hidden" />
    </div>
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List ref={ref} className={cn("m-0 flex list-none items-center gap-1 p-0", className)} {...props} />
));
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

const itemClass =
  "inline-flex h-6 items-center gap-0.5 rounded-pill border border-transparent px-2 text-body font-medium text-ink transition-colors duration-200 ease-out hover:border-line data-[state=open]:border-ink";

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger ref={ref} className={cn(itemClass, "group", className)} {...props}>
    {children}
    <ChevronDown className="size-[16px] transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" aria-hidden="true" />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & { nav?: boolean }
>(({ className, nav, ...props }, ref) => (
  <NavigationMenuPrimitive.Link ref={ref} className={cn(nav && itemClass, className)} {...props} />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content ref={ref} className={cn("w-full", className)} {...props} />
));
NavigationMenuContent.displayName = "NavigationMenuContent";
