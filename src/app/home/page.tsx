"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  Apple,
  ArrowRight,
  Camera,
  ChartLine,
  Check,
  Dumbbell,
  Home,
  Lightbulb,
  Pencil,
  Quote,
  Ruler,
  Target,
  Trophy,
  Utensils,
  Watch,
  X,
} from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { AppBottomNav } from "@/components/app/AppBottomNav";
import { AppLoading } from "@/components/app/AppLoading";
import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { signOut } from "@/lib/auth";

const menuItems = [
  { description: "Seus dispositivos conectados à sua saúde.", icon: Watch, title: "Sincronizar dispositivos", tone: "bg-[#D97706]" },
  { description: "Cadastre refeições comuns, horários e hábitos do dia a dia.", icon: Apple, title: "Alimentações diárias", tone: "bg-[#0F766E]" },
  { description: "Escolha ideias de alimentação alinhadas ao seu objetivo atual.", icon: Utensils, title: "Alimentação ideal para escolher", tone: "bg-[#BE185D]" },
  { description: "Escolha estilos, foco e disponibilidade para seus treinos.", icon: Dumbbell, title: "Escolhas de treinos", tone: "bg-[#2563EB]" },
  { description: "Sugestões para treino, descanso e rotina a partir do seu perfil.", icon: Lightbulb, title: "Recomendações", tone: "bg-[#00875F]" },
  { description: "Marcos, badges e sinais de constância na sua jornada.", icon: Trophy, title: "Conquistas", tone: "bg-[#38BDF8]" },
  { description: "Registre uma frase curta para manter sua motivação visível.", icon: Quote, title: "Frase do dia", tone: "bg-[#7C3AED]" },
];

export default function HomePage() {
  const router = useRouter();
  const { isChecking } = useRequireAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [previewImageUri, setPreviewImageUri] = useState<string | null>(null);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const coverImage = previewImageUri || profileImageUri || "/icon.png";

  function handleFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewImageUri(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
    router.replace("/login");
  }

  if (isChecking) {
    return <AppLoading message="Carregando perfil" />;
  }

  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-[#121214] text-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <input ref={inputRef} accept="image/*" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} type="file" />
      <header className="relative flex h-[274px] shrink-0 items-end justify-center overflow-hidden">
        <Image alt="" className="object-cover opacity-90" fill priority src={coverImage} unoptimized={coverImage.startsWith("data:")} />
        <div className="absolute inset-0 bg-[#121214]/30" />
        <div className="absolute right-4 top-4 grid gap-2">
          <IconButton icon={<Home className="h-6 w-6" />} label="Ir para a tela inicial de treinos" onClick={() => router.push("/dashboard")} />
          <IconButton icon={<Pencil className="h-6 w-6" />} label="Alterar perfil" onClick={() => inputRef.current?.click()} />
          <IconButton icon={<Camera className="h-6 w-6" />} label="Carregar imagem do perfil" onClick={() => inputRef.current?.click()} />
        </div>
        <div className="relative z-10 grid w-full max-w-[420px] gap-2 px-4 pb-6 text-center">
          <h1 className="text-2xl font-black text-white/90 drop-shadow">Caroline Oliveira</h1>
          <p className="mx-auto max-w-[300px] text-[15px] leading-5 text-white/75 drop-shadow">Acompanhe suas escolhas, rotina e evolução.</p>
          {previewImageUri ? (
            <div className="mt-2 flex justify-center gap-2">
              <button className="flex h-10 items-center gap-2 rounded-lg bg-[#00875F] px-4 text-sm font-black text-white" onClick={() => { setProfileImageUri(previewImageUri); setPreviewImageUri(null); }} type="button">
                <Check className="h-4 w-4" />
                Aceitar imagem
              </button>
              <button className="flex h-10 items-center gap-2 rounded-lg border border-[#29292E] bg-[#121214]/70 px-4 text-sm font-bold text-[#C4C4CC]" onClick={() => setPreviewImageUri(null)} type="button">
                <X className="h-4 w-4" />
                Cancelar
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <div className="grid shrink-0 gap-6 px-4 py-4">
        <div className="grid gap-6">
          <div className="grid grid-cols-3 gap-2">
            <SummaryPill icon={<Target className="h-5 w-5" />} label="Objetivo" value="Ganho dia" />
            <SummaryPill icon={<ChartLine className="h-5 w-5" />} label="Nivel" value="Iniciante" />
            <SummaryPill icon={<Check className="h-5 w-5" />} label="Rotina" value="4x semana" />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-black text-white">Menu rápido</h2>
          </div>

        </div>
      </div>

      <div className="profile-scroll min-h-0 flex-1 overflow-y-auto pl-4 pr-2 pb-[calc(110px+env(safe-area-inset-bottom))]">
        <div className="grid gap-2 pb-4">
          <div className="grid gap-2">
            {menuItems.map((item) => (
              <ProfileMenuCard key={item.title} item={item} />
            ))}
          </div>

          <button className="flex items-center gap-4 rounded-lg border border-[#00B37E] bg-[#13231E] p-4 text-left active:opacity-80" type="button">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-lg bg-[#121214] text-[#00B37E]">
              <Ruler className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-extrabold uppercase text-[#00B37E]">Em breve</p>
              <h2 className="text-lg font-black text-white">Evolução corporal</h2>
              <p className="text-[13px] leading-5 text-[#C4C4CC]">Peso, medidas, fotos e progresso em uma linha do tempo visual.</p>
            </div>
            <ArrowRight className="h-6 w-6 text-[#C4C4CC]" />
          </button>
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

function SummaryPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-h-[92px] flex-col items-center justify-center gap-1 rounded-lg bg-[#202024] p-2 text-center">
      <span className="text-[#00B37E]">{icon}</span>
      <span className="text-xs font-bold text-[#C4C4CC]">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

function ProfileMenuCard({ item }: { item: (typeof menuItems)[number] }) {
  const Icon = item.icon;
  return (
    <button className="flex min-h-28 items-center gap-4 rounded-lg bg-[#202024] p-4 text-left active:opacity-80" type="button">
      <div className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg ${item.tone}`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-black leading-5 text-white">{item.title}</h3>
        <p className="mt-1 text-[13px] leading-[18px] text-[#C4C4CC]">{item.description}</p>
      </div>
      <ArrowRight className="h-5 w-5 text-[#C4C4CC]" />
    </button>
  );
}
