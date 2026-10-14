import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(
  ({ className, value, defaultValue, ...props }, ref) => {
    const thumbs = (value ?? defaultValue ?? [0]).length;
    return (
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        className={cn("relative flex h-6 w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-line">
          <SliderPrimitive.Range className="absolute h-full bg-ink" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbs }, (_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block size-5 rounded-full border-2 border-ink bg-white shadow-card transition-transform hover:scale-110 disabled:pointer-events-none"
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
