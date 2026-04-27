import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "green" | "amber" | "red" | "neutral";
};

export function Badge({ className, tone = "neutral", ...props }: Props) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none";
  const tones: Record<string, string> = {
    green: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
    amber: "border-amber-300/30 bg-amber-300/10 text-amber-100",
    red: "border-rose-300/30 bg-rose-400/10 text-rose-100",
    neutral: "border-slate-700/70 bg-slate-950/30 text-slate-300",
  };
  return <span className={cn(base, tones[tone], className)} {...props} />;
}
