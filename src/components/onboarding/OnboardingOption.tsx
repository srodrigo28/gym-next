"use client";

import type { ReactNode } from "react";

type OnboardingOptionProps = {
  icon?: ReactNode;
  label: string;
  onPress: () => void;
  selected: boolean;
};

export function OnboardingOption({ icon, label, onPress, selected }: OnboardingOptionProps) {
  return (
    <button
      aria-pressed={selected}
      className={[
        "flex min-h-[52px] w-full items-center gap-4 rounded-lg border px-4 py-2 text-left transition active:opacity-85",
        selected ? "border-[#00B37E] bg-[#13231E] text-white" : "border-transparent bg-[#202024] text-[#C4C4CC]",
      ].join(" ")}
      onClick={onPress}
      type="button"
    >
      {icon ? <span className={selected ? "text-[#00B37E]" : "text-[#C4C4CC]"}>{icon}</span> : null}
      <span className="flex-1 text-[15px] font-semibold leading-5">{label}</span>
    </button>
  );
}
