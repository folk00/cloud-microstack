import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-slate-800/80 bg-slate-950/30 px-3 py-2 text-sm text-slate-200 " +
          "focus:outline-none focus:ring-2 focus:ring-sky-400/60",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
