"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Dumbbell, History, Home, LogOut, UserCircle, Weight } from "lucide-react";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const categories = ["Costas", "Bíceps", "Tríceps", "Ombro"];

const exercises = [
  { icon: Weight, subtitle: "3 séries x 12 repetições", title: "Puxada frontal", tone: "#0E7490" },
  { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Remada curvada", tone: "#7C3AED" },
  { icon: Dumbbell, subtitle: "3 séries x 12 repetições", title: "Remada unilateral", tone: "#2563EB" },
  { icon: Weight, subtitle: "3 séries x 12 repetições", title: "Levantamento terra", tone: "#B7791F" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useRequireAuth();

  if (isChecking) {
    return <div className="flex min-h-dvh items-center justify-center bg-[#121214] text-[#C4C4CC]">Carregando...</div>;
  }

  return (
    <section className="flex min-h-dvh flex-col bg-[#121214] text-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="flex min-h-[132px] items-center gap-4 bg-[#202024] px-8">
        <Image alt="Avatar" className="rounded-full border-2 border-[#29292E]" height={78} src="/icon.png" width={78} />
        <div className="min-w-0 flex-1">
          <p className="text-xl text-[#C4C4CC]">Olá,</p>
          <h1 className="truncate text-2xl font-black text-white">Rodrigo Gonçalves</h1>
        </div>
        <button aria-label="Voltar para o perfil" className="flex h-12 w-12 items-center justify-center rounded-lg text-[#C4C4CC] active:opacity-75" onClick={() => router.push("/home")} type="button">
          <LogOut className="h-7 w-7" />
        </button>
      </header>

      <div className="app-scroll flex-1 overflow-y-auto pb-4">
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
            <h2 className="text-2xl font-black text-[#C4C4CC]">Exercícios</h2>
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

      <nav className="flex h-[86px] items-center justify-around bg-[#202024] pb-2" style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}>
        <button aria-label="Início" className="flex h-14 w-[72px] items-center justify-center text-[#00B37E]" type="button">
          <Home className="h-8 w-8" />
        </button>
        <button aria-label="Histórico" className="flex h-14 w-[72px] items-center justify-center text-[#C4C4CC]" type="button">
          <History className="h-8 w-8" />
        </button>
        <button aria-label="Abrir perfil" className="flex h-14 w-[72px] items-center justify-center text-[#C4C4CC]" onClick={() => router.push("/home")} type="button">
          <UserCircle className="h-8 w-8" />
        </button>
      </nav>
    </section>
  );
}
