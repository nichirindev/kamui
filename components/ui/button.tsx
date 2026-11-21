import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "neo-hover inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-foreground font-bold uppercase tracking-[0.1em] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background shadow-neo-sm",
        destructive:
          "border-[#0b0b0b] bg-destructive text-white shadow-neo-sm hover:text-white",
        outline:
          "bg-background text-foreground shadow-neo-sm hover:bg-pop-yellow hover:text-[#0b0b0b] dark:hover:text-[#0b0b0b]",
        secondary:
          "border-[#0b0b0b] bg-pop-cyan text-[#0b0b0b] shadow-neo-sm hover:text-[#0b0b0b]",
        ghost:
          "border-transparent bg-transparent shadow-none hover:bg-secondary",
        link: "border-transparent bg-transparent text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-[12px] sm:h-10",
        sm: "h-11 px-3.5 text-[10px] sm:h-9",
        lg: "h-12 px-7 text-sm",
        icon: "h-11 w-11 p-0 sm:h-10 sm:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
