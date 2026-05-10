"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock3, Dumbbell } from "lucide-react";
import { AppBottomNav } from "@/components/app/AppBottomNav";
import { AppLoading } from "@/components/app/AppLoading";
import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { signOut } from "@/lib/auth";

type Period = "week" | "month";

type HistoryItem = {
  group: string;
  time: string;
  title: string;
};

type HistoryDay = {
  date: string;
  label: string;
  items: HistoryItem[];
};

const weekHistory: HistoryDay[] = [
  {
    date: "06.05.26",
    label: "Segunda",
    items: [
      { group: "Costas", time: "08:56", title: "Puxada frontal" },
      { group: "Costas", time: "09:18", title: "Remada unilateral" },
    ],
  },
  {
    date: "08.05.26",
    label: "Quarta",
    items: [
      { group: "Bíceps", time: "18:20", title: "Rosca direta" },
      { group: "Bíceps", time: "18:42", title: "Rosca martelo" },
    ],
  },
  {
    date: "10.05.26",
    label: "Sexta",
    items: [
      { group: "Glúteo", time: "07:35", title: "Elevação pélvica" },
      { group: "Ombro", time: "08:05", title: "Elevação lateral" },
    ],
  },
];

const monthHistory: HistoryDay[] = [
  ...weekHistory,
  {
    date: "03.05.26",
    label: "Domingo",
    items: [
      { group: "Tríceps", time: "10:15", title: "Tríceps pulley" },
      { group: "Costas", time: "10:42", title: "Levantamento terra" },
    ],
  },
  {
    date: "28.04.26",
    label: "Terça",
    items: [{ group: "Ombro", time: "19:10", title: "Desenvolvimento" }],
  },
];

const periods: { label: string; value: Period }[] = [
  { label: "Semana", value: "week" },
  { label: "Mês", value: "month" },
];

export default function HistoryPage() {
  const router = useRouter();
  const { isChecking } = useRequireAuth();
  const [period, setPeriod] = useState<Period>("week");
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const history = period === "week" ? weekHistory : monthHistory;
  const totalItems = history.reduce((total, day) => total + day.items.length, 0);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
    router.replace("/login");
  }

  if (isChecking) {
    return <AppLoading message="Carregando histórico" />;
  }

  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-[#121214] text-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="shrink-0 bg-[#202024] px-4 pb-4 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#00B37E]">Histórico</p>
            <h1 className="mt-1 text-xl font-black leading-6 text-white">Histórico de Exercícios</h1>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#121214] text-[#00B37E]">
            <CalendarDays className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 rounded-lg bg-[#121214] p-1">
          {periods.map((item) => {
            const isSelected = period === item.value;

            return (
              <button
                aria-pressed={isSelected}
                className={`h-10 rounded-md text-sm font-black transition ${isSelected ? "bg-[#00B37E] text-white" : "text-[#C4C4CC]"}`}
                key={item.value}
                onClick={() => setPeriod(item.value)}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg border border-[#29292E] bg-[#18181B] px-3 py-2">
          <span className="text-xs font-bold text-[#C4C4CC]">{history.length} dias listados</span>
          <span className="text-xs font-black text-[#00B37E]">{totalItems} exercícios</span>
        </div>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-[calc(76px+env(safe-area-inset-bottom))] pt-5">
        <div className="grid gap-6">
          {history.map((day) => (
            <section className="grid gap-3" key={day.date}>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#C4C4CC]">{day.date}</h2>
                  <p className="text-xs font-bold uppercase text-[#7C7C8A]">{day.label}</p>
                </div>
                <span className="text-xs font-bold text-[#7C7C8A]">{day.items.length} registros</span>
              </div>

              <div className="grid gap-3">
                {day.items.map((item) => (
                  <button className="flex min-h-[86px] items-center gap-3 rounded-lg bg-[#202024] p-4 text-left active:opacity-80" key={`${day.date}-${item.time}-${item.title}`} type="button">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#121214] text-[#00B37E]">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-white">{item.group}</p>
                      <p className="mt-1 truncate text-base text-[#C4C4CC]">{item.title}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[#8D8D99]">
                      <Clock3 className="h-4 w-4" />
                      <span className="text-sm">{item.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <AppBottomNav active="history" onSignOut={() => setIsSignOutOpen(true)} />
      <SignOutConfirmDialog
        isLoading={isSigningOut}
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
        onConfirm={handleSignOut}
      />
    </section>
  );
}
