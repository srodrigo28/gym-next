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
      <header className="flex min-h-[132px] items-center gap-4 bg-[#202024] px-8">
        <Image alt="Avatar" className="rounded-full border-2 border-[#29292E]" height={78} src="/icon.png" width={78} />
        <div className="min-w-0 flex-1">
          <p className="text-xl text-[#C4C4CC]">Ola,</p>
          <h1 className="truncate text-2xl font-black text-white">Caroline Oliveira</h1>
        </div>
        <button aria-label="Voltar para o perfil" className="flex h-12 w-12 items-center justify-center rounded-lg text-[#C4C4CC] active:opacity-75" onClick={() => router.push("/home")} type="button">
          <UserCircle className="h-7 w-7" />
        </button>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto pb-[calc(110px+env(safe-area-inset-bottom))]">
        <div className="grid gap-8 py-8">
          <div className="app-scroll flex gap-4 overflow-x-auto px-8">
            {categories.map((category, index) => (
              <button
                aria-pressed={index === 0}
                className={`h-[58px] min-w-36 rounded-lg border px-6 text-[17px] font-extrabold uppercase ${index === 0 ? "border-[#00B37E] bg-[#202024] text-[#00B37E]" : "border-transparent bg-[#202024] text-[#C4C4CC]"}`}
                key={category}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between px-8">
            <h2 className="text-2xl font-black text-[#C4C4CC]">Exercicios</h2>
            <span className="text-[22px] text-[#C4C4CC]">{exercises.length}</span>
          </div>

          <div className="grid gap-4 px-8">
            {exercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <button className="flex min-h-[104px] items-center gap-4 rounded-lg bg-[#29292E] p-4 text-left active:opacity-80" key={exercise.title} type="button">
                  <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: exercise.tone }}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[21px] font-black leading-6 text-white">{exercise.title}</h3>
                    <p className="mt-2 text-[16px] leading-5 text-[#C4C4CC]">{exercise.subtitle}</p>
                  </div>
                  <ArrowRight className="h-7 w-7 text-[#7C7C8A]" />
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
