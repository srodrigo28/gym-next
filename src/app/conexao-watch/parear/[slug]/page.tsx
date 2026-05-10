"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Bluetooth, ChevronRight, ShieldCheck, Watch } from "lucide-react";
import { AppBottomNav } from "@/components/app/AppBottomNav";
import { AppLoading } from "@/components/app/AppLoading";
import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { signOut } from "@/lib/auth";
import { findDeviceBySlug } from "../../devices";

export default function PairDevicePage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const { isChecking } = useRequireAuth();
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const device = findDeviceBySlug(params.slug);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
    router.replace("/login");
  }

  if (isChecking) {
    return <AppLoading message="Carregando pareamento" />;
  }

  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-[#121214] text-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="shrink-0 bg-[#202024] px-4 pb-4 pt-4">
        <div className="flex items-center gap-3">
          <button aria-label="Voltar para seleção de dispositivos" className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#121214] text-[#C4C4CC] active:opacity-75" onClick={() => router.push("/conexao-watch")} type="button">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase text-[#00B37E]">Próxima etapa</p>
            <h1 className="mt-0.5 text-xl font-black leading-6 text-white">Parear {device.name}</h1>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#121214] text-[#00B37E]">
            <Bluetooth className="h-5 w-5" />
          </div>
        </div>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-[calc(76px+env(safe-area-inset-bottom))] pt-5">
        <div className="grid gap-5">
          <section className="grid justify-items-center gap-4 rounded-lg border border-[#29292E] bg-[#202024] p-5 text-center">
            <div className="relative h-52 w-full overflow-hidden rounded-lg bg-white">
              <Image alt="" className="object-contain p-4" fill sizes="100vw" src={device.image} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-[#00B37E]">Dispositivo selecionado</p>
              <h2 className="mt-1 text-2xl font-black leading-7 text-white">{device.name}</h2>
              <p className="mx-auto mt-2 max-w-[280px] text-sm leading-5 text-[#C4C4CC]">{device.description}</p>
            </div>
          </section>

          <section className="rounded-lg bg-[#202024] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#121214] text-[#00B37E]">
                <Watch className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase text-[#00B37E]">Conexão Bluetooth</p>
                <h2 className="mt-1 text-base font-black text-white">Prepare o dispositivo</h2>
                <p className="mt-1 text-xs leading-4 text-[#C4C4CC]">
                  Mantenha o Bluetooth ligado e deixe o dispositivo próximo ao celular durante o pareamento.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-[#00B37E]/40 bg-[#13231E] p-3">
              <div className="flex gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#00B37E]" />
                <p className="text-xs leading-4 text-[#C4C4CC]">
                  O app pedirá permissão antes de acessar dados como passos, batimentos, gasto calórico e treinos registrados.
                </p>
              </div>
            </div>

            <button className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#00875F] text-sm font-black text-white active:opacity-80" type="button">
              Iniciar pareamento
              <ChevronRight className="h-4 w-4" />
            </button>
          </section>
        </div>
      </div>

      <AppBottomNav active="profile" onSignOut={() => setIsSignOutOpen(true)} />
      <SignOutConfirmDialog
        isLoading={isSigningOut}
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
        onConfirm={handleSignOut}
      />
    </section>
  );
}
