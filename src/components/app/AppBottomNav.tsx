"use client";

import { History, Home, LogOut, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type AppBottomNavProps = {
  active: "home" | "profile";
  onSignOut: () => void;
};

export function AppBottomNav({ active, onSignOut }: AppBottomNavProps) {
  const router = useRouter();

  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 flex h-[86px] items-center justify-around bg-[#202024] pb-2" style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}>
      <button aria-label="Inicio" className={`flex h-14 w-[72px] items-center justify-center ${active === "home" ? "text-[#00B37E]" : "text-[#C4C4CC]"}`} onClick={() => router.push("/dashboard")} type="button">
        <Home className="h-8 w-8" />
      </button>
      <button aria-label="Historico" className="flex h-14 w-[72px] items-center justify-center text-[#C4C4CC]" type="button">
        <History className="h-8 w-8" />
      </button>
      <button aria-label="Abrir perfil" className={`flex h-14 w-[72px] items-center justify-center ${active === "profile" ? "text-[#00B37E]" : "text-[#C4C4CC]"}`} onClick={() => router.push("/home")} type="button">
        <UserCircle className="h-8 w-8" />
      </button>
      <button aria-label="Sair da conta" className="flex h-14 w-[72px] items-center justify-center text-[#F75A68]" onClick={onSignOut} type="button">
        <LogOut className="h-8 w-8" />
      </button>
    </nav>
  );
}
