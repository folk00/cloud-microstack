import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-slate-800/80 bg-slate-950/30 px-3 py-2 text-sm text-slate-200 " +
          "placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
