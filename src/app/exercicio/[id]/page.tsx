"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Check, Clock3, MessageSquare, Repeat2, Star } from "lucide-react";
import { AppBottomNav } from "@/components/app/AppBottomNav";
import { AppLoading } from "@/components/app/AppLoading";
import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import { findExerciseById } from "@/lib/exercises";
import { signOut } from "@/lib/auth";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function ExerciseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { isChecking } = useRequireAuth();
  const exercise = findExerciseById(params.id);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const selectedMedia = exercise.media[selectedMediaIndex];
  const GroupIcon = exercise.icon;

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
    router.replace("/login");
  }

  if (isChecking) {
    return <AppLoading message="Carregando exercício" />;
  }

  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-[#121214] text-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="shrink-0 bg-[#202024] px-4 pb-4 pt-4">
        <div className="flex items-center gap-3">
          <button aria-label="Voltar para treinos" className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#121214] text-[#00B37E] active:opacity-75" onClick={() => router.push("/dashboard")} type="button">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-black leading-6 text-white">{exercise.title}</h1>
            <div className="mt-1 flex items-center gap-2 text-[#C4C4CC]">
              <GroupIcon className="h-4 w-4" />
              <span className="text-sm font-bold">{exercise.group}</span>
            </div>
          </div>
          <button
            aria-label={isFavorite ? "Remover dos favoritos" : "Favoritar exercício"}
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#121214] ${isFavorite ? "text-[#F5B041]" : "text-[#C4C4CC]"}`}
            onClick={() => setIsFavorite((current) => !current)}
            type="button"
          >
            <Star className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-[calc(76px+env(safe-area-inset-bottom))] pt-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-[#202024] p-1">
            {exercise.media.map((media, index) => {
              const isSelected = selectedMediaIndex === index;

              return (
                <button
                  aria-pressed={isSelected}
                  className={`h-10 rounded-md text-xs font-black transition ${isSelected ? "bg-[#00B37E] text-white" : "text-[#C4C4CC]"}`}
                  key={media.label}
                  onClick={() => setSelectedMediaIndex(index)}
                  type="button"
                >
                  {media.label}
                </button>
              );
            })}
          </div>

          <section className="overflow-hidden rounded-lg bg-[#202024]">
            <div className="relative flex aspect-[4/3] items-center justify-center bg-[#18181B]">
              {selectedMedia.type === "video" ? (
                <div className="grid justify-items-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00B37E] text-white">
                    <Repeat2 className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-base font-black text-white">Vídeo demonstrativo</p>
                    <p className="mt-1 text-xs text-[#C4C4CC]">Substituir por {selectedMedia.src}</p>
                  </div>
                </div>
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#29292E] to-[#121214] p-5 text-center">
                  <div className="grid gap-2">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: exercise.tone }}>
                      <GroupIcon className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-base font-black text-white">{selectedMedia.label}</p>
                    <p className="text-xs text-[#C4C4CC]">Substituir por {selectedMedia.src}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-lg bg-[#202024] p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <Metric icon={<Repeat2 className="h-5 w-5" />} label="Séries" value={`${exercise.series}`} />
              <Metric icon={<Check className="h-5 w-5" />} label="Repetições" value={`${exercise.repetitions}`} />
              <Metric icon={<Clock3 className="h-5 w-5" />} label="Descanso" value={`${exercise.restSeconds}s`} />
            </div>

            <button
              className={`mt-4 flex h-11 w-full items-center justify-center rounded-lg text-sm font-black text-white active:opacity-80 ${isCompleted ? "bg-[#00B37E]/65" : "bg-[#00875F]"}`}
              onClick={() => setIsCompleted((current) => !current)}
              type="button"
            >
              {isCompleted ? "Realizado" : "Marcar como realizado"}
            </button>
          </section>

          <section className="rounded-lg bg-[#202024] p-4">
            <h2 className="text-base font-black text-white">Como executar</h2>
            <ul className="mt-3 grid gap-2">
              {exercise.instructions.map((instruction) => (
                <li className="flex gap-2 text-xs leading-4 text-[#C4C4CC]" key={instruction}>
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00B37E]" />
                  {instruction}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg bg-[#202024] p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#00B37E]" />
              <h2 className="text-base font-black text-white">Comentário pessoal</h2>
            </div>
            <textarea
              className="mt-3 min-h-24 w-full resize-none rounded-lg border border-[#29292E] bg-[#121214] p-3 text-sm text-white outline-none placeholder:text-[#7C7C8A] focus:border-[#00B37E]"
              onChange={(event) => setComment(event.target.value)}
              placeholder="Exemplo: aumentar carga na próxima semana..."
              value={comment}
            />
          </section>
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

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="grid justify-items-center gap-1 rounded-lg bg-[#121214] p-3">
      <span className="text-[#00B37E]">{icon}</span>
      <span className="text-lg font-black text-white">{value}</span>
      <span className="text-[11px] font-bold text-[#C4C4CC]">{label}</span>
    </div>
  );
}
