import Image from "next/image";
import type { PropsWithChildren } from "react";

type AuthBackgroundProps = PropsWithChildren<{
  contentClassName?: string;
}>;

export function AuthBackground({ children, contentClassName = "" }: AuthBackgroundProps) {
  return (
    <section className="relative min-h-dvh overflow-hidden bg-[#121214]">
      <Image
        alt=""
        aria-hidden
        className="absolute -right-52 -top-24 h-[520px] w-[520px] opacity-[0.08]"
        height={520}
        priority
        src="/icon.png"
        style={{ height: 520, width: 520 }}
        width={520}
      />
      <div className="absolute inset-0 bg-[#121214]/95" />
      <div
        className={`relative z-10 min-h-dvh ${contentClassName}`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {children}
      </div>
    </section>
  );
}
