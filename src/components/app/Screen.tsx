import type { PropsWithChildren } from "react";

type ScreenProps = PropsWithChildren<{
  className?: string;
}>;

export function Screen({ children, className = "" }: ScreenProps) {
  return (
    <section
      className={`min-h-dvh bg-[#121214] text-white ${className}`}
      style={{
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {children}
    </section>
  );
}
