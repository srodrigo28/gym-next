"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Dumbbell, UserCircle, Weight } from "lucide-react";
import { AppBottomNav } from "@/components/app/AppBottomNav";
import { AppLoading } from "@/components/app/AppLoading";
import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { signOut } from "@/lib/auth";

const categories = ["Costas", "Biceps", "Triceps", "Ombro"];

const exercises = [
  { icon: Weight, subtitle: "3 series x 12 repeticoes", title: "Puxada frontal", tone: "#0E7490" },
  { icon: Dumbbell, subtitle: "3 series x 12 repeticoes", title: "Remada curvada", tone: "#7C3AED" },
  { icon: Dumbbell, subtitle: "3 series x 12 repeticoes", title: "Remada unilateral", tone: "#2563EB" },
  { icon: Weight, subtitle: "3 series x 12 repeticoes", title: "Levantamento terra", tone: "#B7791F" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useRequireAuth();
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
    router.replace("/login");
  }

  if (isChecking) {
    return <AppLoading message="Carregando treinos" />;
  }

  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-[#121214] text-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="flex min-h-[88px] items-center gap-3 bg-[#202024] px-4">
        <Image alt="Avatar" className="h-14 w-14 rounded-full border-2 border-[#29292E]" height={56} src="/icon.png" width={56} />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-5 text-[#C4C4CC]">Ola,</p>
          <h1 className="truncate text-xl font-black leading-6 text-white">Caroline Oliveira</h1>
        </div>
        <button aria-label="Voltar para o perfil" className="flex h-9 w-9 items-center justify-center rounded-lg text-[#C4C4CC] active:opacity-75" onClick={() => router.push("/home")} type="button">
          <UserCircle className="h-5 w-5" />
        </button>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto pb-[calc(76px+env(safe-area-inset-bottom))]">
        <div className="grid gap-5 py-5">
          <div className="category-scroll flex gap-3 overflow-x-auto px-4 pb-1">
            {categories.map((category, index) => (
              <button
                aria-pressed={index === 0}
                className={`h-11 min-w-28 rounded-lg border px-4 text-[13px] font-extrabold uppercase ${index === 0 ? "border-[#00B37E] bg-[#202024] text-[#00B37E]" : "border-transparent bg-[#202024] text-[#C4C4CC]"}`}
                key={category}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-black text-[#C4C4CC]">Exercicios</h2>
            <span className="text-base text-[#C4C4CC]">{exercises.length}</span>
          </div>

          <div className="grid gap-3 px-4">
            {exercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <button className="flex min-h-[84px] items-center gap-3.5 rounded-lg bg-[#29292E] p-3.5 text-left active:opacity-80" key={exercise.title} type="button">
                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: exercise.tone }}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-black leading-5 text-white">{exercise.title}</h3>
                    <p className="mt-1 text-[13px] leading-4 text-[#C4C4CC]">{exercise.subtitle}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#7C7C8A]" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AppBottomNav active="home" onSignOut={() => setIsSignOutOpen(true)} />
      <SignOutConfirmDialog
        isLoading={isSigningOut}
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
        onConfirm={handleSignOut}
      />
    </section>
  );
}
