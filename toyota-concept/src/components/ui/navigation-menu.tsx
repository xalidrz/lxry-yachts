import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Root is intentionally `static` so the dropdown viewport anchors to the floating pill.
 */
export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} className={cn("static", className)} {...props}>
    {children}
    {/* anchors to the nearest positioned ancestor (the floating pill) */}
    <div className="absolute left-0 top-[calc(100%+8px)] w-full">
      <NavigationMenuPrimitive.Viewport
        data-surface="ink"
        className="h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-[24px] border border-line bg-ink text-fg data-[state=closed]:hidden"
      />
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

const itemClass = "nav-link";

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
