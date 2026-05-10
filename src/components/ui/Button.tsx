"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  loading?: boolean;
  title: string;
  variant?: "primary" | "outline";
};

export function Button({ className = "", disabled, icon, loading = false, title, variant = "primary", ...props }: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={[
        "flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-lg border text-sm font-bold transition active:scale-[0.99]",
        variant === "outline"
          ? "border-[#00B37E] bg-transparent text-[#00B37E]"
          : "border-[#00875F] bg-[#00875F] text-white",
        isDisabled ? "cursor-not-allowed opacity-60" : "active:opacity-80",
        className,
      ].join(" ")}
      disabled={isDisabled}
      type={props.type ?? "button"}
      {...props}
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : icon}
      {!loading ? <span>{title}</span> : null}
    </button>
  );
}
