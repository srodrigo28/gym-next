"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  label: string;
};

export function IconButton({ className = "", icon, label, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#00B37E]/80 bg-[#121214]/60 text-[#00B37E] transition active:opacity-75 ${className}`}
      type="button"
      {...props}
    >
      {icon}
    </button>
  );
}
