"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Dumbbell, UserCircle, Weight } from "lucide-react";
import { AppBottomNav } from "@/components/app/AppBottomNav";
import { AppLoading } from "@/components/app/AppLoading";
import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { signOut } from "@/lib/auth";

type Category = "Bíceps" | "Costas" | "Glúteo" | "Ombro" | "Tríceps";

type Exercise = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  subtitle: string;
  title: string;
  tone: string;
};

const categories: Category[] = ["Bíceps", "Costas", "Glúteo", "Ombro", "Tríceps"];

const exercisesByCategory: Record<Category, Exercise[]> = {
  Bíceps: [
    { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Rosca direta", tone: "#7C3AED" },
    { icon: Dumbbell, subtitle: "3 séries x 10 repetições", title: "Rosca alternada", tone: "#2563EB" },
    { icon: Weight, subtitle: "3 séries x 12 repetições", title: "Rosca martelo", tone: "#0F766E" },
    { icon: Dumbbell, subtitle: "2 séries x 15 repetições", title: "Rosca concentrada", tone: "#BE185D" },
  ],
  Costas: [
    { icon: Weight, subtitle: "3 séries x 12 repetições", title: "Puxada frontal", tone: "#0E7490" },
    { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Remada curvada", tone: "#7C3AED" },
    { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Remada unilateral", tone: "#2563EB" },
    { icon: Weight, subtitle: "3 séries x 10 repetições", title: "Levantamento terra", tone: "#B7791F" },
  ],
  Glúteo: [
    { icon: Weight, subtitle: "4 séries x 10 repetições", title: "Elevação pélvica", tone: "#BE185D" },
    { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Agachamento sumô", tone: "#D97706" },
    { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Coice no cabo", tone: "#7C3AED" },
    { icon: Weight, subtitle: "3 séries x 15 repetições", title: "Abdução de quadril", tone: "#0F766E" },
  ],
  Ombro: [
    { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Elevação lateral", tone: "#38BDF8" },
    { icon: Weight, subtitle: "3 séries x 10 repetições", title: "Desenvolvimento", tone: "#B7791F" },
    { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Elevação frontal", tone: "#2563EB" },
    { icon: Weight, subtitle: "2 séries x 15 repetições", title: "Crucifixo inverso", tone: "#0F766E" },
  ],
  Tríceps: [
    { icon: Weight, subtitle: "3 séries x 12 repetições", title: "Tríceps pulley", tone: "#D97706" },
    { icon: Dumbbell, subtitle: "3 séries x 10 repetições", title: "Tríceps francês", tone: "#2563EB" },
    { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Tríceps testa", tone: "#7C3AED" },
    { icon: Weight, subtitle: "2 séries x 12 repetições", title: "Mergulho no banco", tone: "#0E7490" },
  ],
};

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useRequireAuth();
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Bíceps");
  const exercises = exercisesByCategory[selectedCategory];

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
        <Image alt="Avatar" className="h-14 w-14 rounded-full border-2 border-[#29292E]" height={56} src="/icon.png" style={{ height: 56, width: 56 }} width={56} />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-5 text-[#C4C4CC]">Olá,</p>
          <h1 className="truncate text-xl font-black leading-6 text-white">Caroline Oliveira</h1>
        </div>
        <button aria-label="Voltar para o perfil" className="flex h-9 w-9 items-center justify-center rounded-lg text-[#C4C4CC] active:opacity-75" onClick={() => router.push("/home")} type="button">
          <UserCircle className="h-5 w-5" />
        </button>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto pb-[calc(76px+env(safe-area-inset-bottom))]">
        <div className="grid gap-6 py-5">
          <div className="w-full overflow-hidden px-4">
            <div className="category-scroll flex h-[82px] w-full max-w-full items-center gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 py-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`h-11 min-w-[112px] shrink-0 rounded-lg border px-4 text-[13px] font-extrabold uppercase transition ${isSelected ? "border-[#00B37E] bg-[#202024] text-[#00B37E]" : "border-transparent bg-[#202024] text-[#C4C4CC]"}`}
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-black text-[#C4C4CC]">Exercícios</h2>
            <span className="text-base text-[#C4C4CC]">{exercises.length}</span>
          </div>

          <div className="flex flex-col gap-3.5 px-4">
            {exercises.map((exercise) => {
              const Icon = exercise.icon;

              return (
                <button className="flex min-h-[86px] w-full items-center gap-3.5 rounded-lg bg-[#29292E] p-3.5 text-left active:opacity-80" key={exercise.title} type="button">
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
