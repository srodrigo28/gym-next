import type { PropsWithChildren } from "react";

export function MobileShell({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-dvh w-full items-stretch justify-center bg-[#0A0A0B] text-white">
      <div className="relative min-h-dvh w-full max-w-[430px] overflow-hidden bg-[#121214] shadow-2xl shadow-black/40">
        {children}
      </div>
    </main>
  );
}
