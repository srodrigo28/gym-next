"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  label?: string;
  rightText?: string;
};

export function Input({ className = "", error, helperText, icon, label, rightText, type, ...props }: InputProps) {
  const id = useId();
  const [isHidden, setIsHidden] = useState(type === "password");
  const inputType = type === "password" ? (isHidden ? "password" : "text") : type;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  return (
    <div className="grid w-full min-w-0 gap-1.5">
      {label ? (
        <label className="text-sm font-bold text-white" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div
        className={[
          "flex h-16 w-full min-w-0 items-center gap-3 rounded-md border bg-[#18181B] px-4 text-white shadow-[#00B37E]/20 transition focus-within:border-[#00B37E] focus-within:shadow-[0_0_0_3px_rgba(0,179,126,0.12)]",
          error ? "border-[#F75A68]" : "border-transparent",
          className,
        ].join(" ")}
      >
        {icon ? (
          <div className="-my-px -ml-4 flex h-[calc(100%+2px)] w-14 shrink-0 items-center justify-center border-r border-white/10 text-[#8D8D99]">
            {icon}
          </div>
        ) : null}
        <input
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={Boolean(error)}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-[#7C7C8A] autofill:shadow-[inset_0_0_0_1000px_#18181B] autofill:[-webkit-text-fill-color:#FFFFFF]"
          id={id}
          type={inputType}
          {...props}
        />
        {type === "password" ? (
          <button
            aria-label={isHidden ? "Mostrar senha" : "Ocultar senha"}
            className="-my-px -mr-4 flex h-[calc(100%+2px)] w-14 shrink-0 items-center justify-center border-l border-white/10 text-[#8D8D99] active:opacity-75"
            onClick={() => setIsHidden((current) => !current)}
            type="button"
          >
            {isHidden ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        ) : null}
        {rightText ? <span className="text-sm font-bold text-[#C4C4CC]">{rightText}</span> : null}
      </div>
      {helperText && !error ? (
        <p className="text-xs leading-4 text-[#C4C4CC]" id={helperId}>
          {helperText}
        </p>
      ) : null}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] leading-4 text-[#F75A68]"
            exit={{ opacity: 0, y: -3 }}
            id={errorId}
            initial={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
