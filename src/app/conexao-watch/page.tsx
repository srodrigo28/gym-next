"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Bluetooth, Check, ShieldCheck } from "lucide-react";
import { AppBottomNav } from "@/components/app/AppBottomNav";
import { AppLoading } from "@/components/app/AppLoading";
import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { signOut } from "@/lib/auth";
import { devices } from "./devices";

export default function WatchConnectionPage() {
  const router = useRouter();
  const { isChecking } = useRequireAuth();
  const [selectedDeviceSlug, setSelectedDeviceSlug] = useState(devices[0].slug);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
    router.replace("/login");
  }

  if (isChecking) {
    return <AppLoading message="Carregando conexão" />;
  }

  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-[#121214] text-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="shrink-0 bg-[#202024] px-4 pb-4 pt-4">
        <div className="flex items-center gap-3">
          <button aria-label="Voltar para o perfil" className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#121214] text-[#C4C4CC] active:opacity-75" onClick={() => router.push("/home")} type="button">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase text-[#00B37E]">Bluetooth seguro</p>
            <h1 className="mt-0.5 text-xl font-black leading-6 text-white">Conectar dispositivo</h1>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#121214] text-[#00B37E]">
            <Bluetooth className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[#00B37E]/40 bg-[#13231E] p-3">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#121214] text-[#00B37E]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">Escolha o dispositivo para parear</h2>
              <p className="mt-1 text-xs leading-4 text-[#C4C4CC]">
                Vamos buscar dados como passos, batimentos, gasto calórico e treinos registrados para melhorar seu acompanhamento.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-[calc(76px+env(safe-area-inset-bottom))] pt-4">
        <div className="grid gap-4">
          <section aria-labelledby="device-list-title" className="grid gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-white" id="device-list-title">Tipos de dispositivo</h2>
              <span className="text-xs font-bold text-[#7C7C8A]">{devices.length} opções</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {devices.map((device) => {
                const isSelected = selectedDeviceSlug === device.slug;

                return (
                  <button
                    aria-label={`Selecionar ${device.name}. ${device.description}`}
                    className={`group relative aspect-[4/5] overflow-hidden rounded-lg border bg-white text-left shadow-lg shadow-black/20 transition active:opacity-80 ${isSelected ? "border-[#00B37E]" : "border-[#29292E]"}`}
                    key={device.name}
                    onClick={() => {
                      setSelectedDeviceSlug(device.slug);
                      router.push(`/conexao-watch/parear/${device.slug}`);
                    }}
                    type="button"
                  >
                    <Image alt="" className="object-contain transition duration-200 group-active:scale-[0.98]" fill sizes="50vw" src={device.image} />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#121214]/90 via-[#121214]/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                      <h3 className="text-sm font-black leading-4 text-white drop-shadow">{device.name}</h3>
                      {isSelected ? (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00B37E] text-white shadow-lg shadow-black/30">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
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
