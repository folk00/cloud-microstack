import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-sky-400/70 bg-gradient-to-br from-sky-400/20 to-violet-500/10 shadow-soft hover:brightness-110",
        ghost:
          "border border-slate-700/70 bg-slate-900/30 text-slate-200 hover:border-sky-400/60",
        subtle:
          "border border-slate-700/70 bg-slate-950/30 text-slate-300 hover:text-slate-100",
        danger:
          "border border-rose-400/60 bg-rose-500/10 text-rose-100 hover:brightness-110",
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
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
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
