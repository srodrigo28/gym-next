"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Apple,
  BarChart3,
  Bed,
  Briefcase,
  Calendar,
  Camera,
  CheckCircle,
  ChevronDown,
  Dumbbell,
  Flame,
  Heart,
  Moon,
  Shield,
  Smile,
  Trophy,
  User,
} from "lucide-react";
import { OnboardingFooter } from "@/components/onboarding/OnboardingFooter";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { OnboardingOption } from "@/components/onboarding/OnboardingOption";
import { Input } from "@/components/ui/Input";
import { bodyMetricsSchema, onboardingSchema } from "@/schemas/onboarding";
import { getOnboardingDraft, saveOnboardingDraft, saveOnboardingProfile } from "@/lib/onboarding";
import type { OnboardingProfile, TrainingDaysPerWeek } from "@/types/onboarding";

const previousTrainingStepIndex = 18;
const sodaFrequencyStepIndex = 14;
const sodaAmountStepIndex = 15;
const professionalPurposeStepIndex = 20;

type IllustrationName = "welcome" | "sex" | "work" | "training" | "metrics" | "sleep" | "history" | "nutrition" | "photos" | "summary";

const steps: { description: string; illustration: IllustrationName; title: string }[] = [
  { description: "Algumas respostas rápidas para personalizar treinos, rotina e recomendações.", illustration: "welcome", title: "Vamos ajustar sua jornada" },
  { description: "Essa informação ajuda nas métricas e na personalização inicial.", illustration: "sex", title: "Como você prefere informar seu perfil?" },
  { description: "Sua rotina muda bastante o tipo de treino que faz sentido para você.", illustration: "work", title: "Como é seu trabalho no dia a dia?" },
  { description: "Relacionamento e rotina social também influenciam consistência, energia e tempo disponível.", illustration: "work", title: "Como está sua vida afetiva hoje?" },
  { description: "Essa resposta ajuda a ajustar metas e comunicação sem criar pressão desnecessária.", illustration: "work", title: "Você sente dificuldade em se relacionar?" },
  { description: "Humor e energia emocional mudam o jeito ideal de manter uma rotina de treino.", illustration: "sleep", title: "Como anda seu humor?" },
  { description: "Vamos montar uma rotina realista, daquelas que cabem na vida de verdade.", illustration: "training", title: "Qual rotina de treinos você quer seguir?" },
  { description: "Escolher um período ajuda a encaixar o treino na sua rotina.", illustration: "training", title: "Qual período combina melhor com você?" },
  { description: "Esses dados ajudam a acompanhar evolução e ajustar metas futuras.", illustration: "metrics", title: "Peso e altura atuais" },
  { description: "Sono e recuperação contam muito. Músculo também gosta de travesseiro.", illustration: "sleep", title: "Como anda seu sono?" },
  { description: "Acordar bem ajuda a entender recuperação, energia e ritmo de treino.", illustration: "sleep", title: "Você costuma acordar descansado?" },
  { description: "Alguns hábitos pesam bastante na recuperação e no progresso ao longo das semanas.", illustration: "nutrition", title: "Você fuma atualmente?" },
  { description: "Essa informação ajuda a calibrar metas e recomendações sem julgamento.", illustration: "nutrition", title: "Você consome cerveja ou bebida alcoólica?" },
  { description: "Vamos entender bebidas do dia a dia sem exagerar nas perguntas.", illustration: "nutrition", title: "Você costuma beber refrigerante?" },
  { description: "Só aparece para quem informou que bebe refrigerante.", illustration: "nutrition", title: "Com que frequência você bebe refrigerante?" },
  { description: "Essa medida ajuda a estimar melhor o consumo, mesmo que seja aproximado.", illustration: "nutrition", title: "Quanto refrigerante você toma por vez?" },
  { description: "Monitorar ou não monitorar alimentação muda o tipo de dica que faz sentido.", illustration: "nutrition", title: "Você acompanha sua alimentação?" },
  { description: "Assim evitamos jogar você no modo chefão logo no primeiro treino.", illustration: "history", title: "Você já treinou antes?" },
  { description: "Isso ajuda a ajustar progressão, carga e nível de explicação.", illustration: "history", title: "Por quanto tempo você treinou?" },
  { description: "Treino profissional pede outra intensidade de planejamento e acompanhamento.", illustration: "training", title: "Você treina com finalidade profissional?" },
  { description: "A finalidade ajuda a definir prioridade, volume e tipo de evolução.", illustration: "training", title: "Qual é o foco profissional do treino?" },
  { description: "Sem terrorismo alimentar. A ideia é dar dicas simples e úteis.", illustration: "nutrition", title: "Você quer dicas de alimentação?" },
  { description: "Pequenos lembretes podem ajudar a manter consistência sem pressão.", illustration: "nutrition", title: "Você quer conselhos diários?" },
  { description: "Fotos são opcionais e servem para acompanhar hábitos e evolução.", illustration: "photos", title: "Quer registrar fotos das refeições?" },
  { description: "As fotos de evolução ajudam a enxergar progresso além da balança.", illustration: "photos", title: "Quer registrar fotos de evolução?" },
  { description: "Confira suas respostas antes de finalizar a configuração.", illustration: "summary", title: "Resumo da sua jornada" },
];

const labels: Record<string, string> = {
  "5_to_6": "5 a 6 horas",
  "7_to_8": "7 a 8 horas",
  "200_to_350": "200 a 350 ml",
  "350_to_600": "350 a 600 ml",
  less_than_5: "menos de 5 horas",
  more_than_8: "mais de 8 horas",
  varies: "varia bastante",
  never: "nunca treinou",
  short_time: "pouco tempo",
  few_months: "alguns meses",
  more_than_1_year: "mais de 1 ano",
  currently_training: "treina atualmente",
  yes: "sim",
  moderate: "talvez no futuro",
  maybe_later: "talvez depois",
  no: "não",
  stopped: "parou de fumar",
  rarely: "raramente",
  weekly_1_2: "1 a 2 vezes por semana",
  weekly_3_plus: "3+ vezes por semana",
  weekly_3_5: "3 a 5 vezes por semana",
  daily: "todos os dias",
  up_to_200: "até 200 ml",
  over_600: "mais de 600 ml",
  sometimes: "as vezes",
  single: "solteiro(a)",
  married: "casado(a)",
  serious_relationship: "relacionamento serio",
  other: "outro",
  often: "com frequência",
  stable: "estável",
  motivated: "animado(a)",
  anxious: "ansioso(a)",
  irritated: "irritado(a)",
  discouraged: "desanimado(a)",
  competition: "competicao esportiva",
  bodybuilding: "estética ou fisiculturismo",
  professional_performance: "performance profissional",
  physical_test: "teste físico ou concurso",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<OnboardingProfile>({});
  const [step, setStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoadedDraft, setHasLoadedDraft] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setProfile(getOnboardingDraft());
      setHasLoadedDraft(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hasLoadedDraft) {
      return;
    }

    saveOnboardingDraft(profile);
  }, [hasLoadedDraft, profile]);

  const visibleStepIndexes = useMemo(() => getVisibleStepIndexes(profile), [profile]);
  const activeStep = visibleStepIndexes.includes(step) ? step : (visibleStepIndexes[0] ?? 0);
  const currentStepPosition = Math.max(visibleStepIndexes.indexOf(activeStep), 0);
  const currentStepNumber = currentStepPosition + 1;
  const totalSteps = visibleStepIndexes.length;
  const canContinue = useMemo(() => isStepValid(activeStep, profile), [activeStep, profile]);

  function updateProfile(payload: Partial<OnboardingProfile>) {
    setProfile((current) => ({ ...current, ...payload }));
  }

  function goBack() {
    setStep(visibleStepIndexes[Math.max(currentStepPosition - 1, 0)] ?? 0);
  }

  async function goNext() {
    if (!canContinue) {
      return;
    }

    if (currentStepNumber < totalSteps) {
      setStep(visibleStepIndexes[currentStepPosition + 1]);
      return;
    }

    const result = onboardingSchema.safeParse(profile);

    if (!result.success) {
      return;
    }

    setIsSaving(true);
    await saveOnboardingProfile(result.data);
    router.replace("/home");
  }

  return (
    <OnboardingLayout
      currentStep={currentStepNumber}
      description={steps[activeStep].description}
      footer={
        <OnboardingFooter
          canGoBack={currentStepPosition > 0}
          canGoNext={canContinue}
          loading={isSaving}
          nextLabel={currentStepNumber === totalSteps ? "Finalizar" : activeStep === 0 ? "Começar" : "Continuar"}
          onBack={goBack}
          onNext={goNext}
        />
      }
      illustration={steps[activeStep].illustration}
      title={steps[activeStep].title}
      totalSteps={totalSteps}
    >
      <StepContent profile={profile} step={activeStep} updateProfile={updateProfile} />
    </OnboardingLayout>
  );
}

function StepContent({ profile, step, updateProfile }: { profile: OnboardingProfile; step: number; updateProfile: (payload: Partial<OnboardingProfile>) => void }) {
  if (step === 0) return <p className="text-base leading-6 text-[#C4C4CC]">Prometemos perguntas objetivas. Nada de entrevista de emprego com halter na mão.</p>;
  if (step === 1) return (
    <>
      <OnboardingOption icon={<User size={22} />} label="Masculino" selected={profile.sex === "male"} onPress={() => updateProfile({ sex: "male" })} />
      <OnboardingOption icon={<User size={22} />} label="Feminino" selected={profile.sex === "female"} onPress={() => updateProfile({ sex: "female" })} />
      <OnboardingOption icon={<Shield size={22} />} label="Prefiro não informar" selected={profile.sex === "prefer_not_to_say"} onPress={() => updateProfile({ sex: "prefer_not_to_say" })} />
    </>
  );
  if (step === 2) return (
    <>
      <OnboardingOption icon={<Briefcase size={22} />} label="Passo a maior parte do dia sentado" selected={profile.workRoutine === "mostly_sitting"} onPress={() => updateProfile({ workRoutine: "mostly_sitting" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Fico bastante tempo em pé" selected={profile.workRoutine === "mostly_standing"} onPress={() => updateProfile({ workRoutine: "mostly_standing" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Tenho trabalho físico moderado" selected={profile.workRoutine === "moderate_physical"} onPress={() => updateProfile({ workRoutine: "moderate_physical" })} />
      <OnboardingOption icon={<Dumbbell size={22} />} label="Tenho trabalho físico intenso" selected={profile.workRoutine === "intense_physical"} onPress={() => updateProfile({ workRoutine: "intense_physical" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Minha rotina varia muito" selected={profile.workRoutine === "varies"} onPress={() => updateProfile({ workRoutine: "varies" })} />
      <Input icon={<Briefcase className="h-5 w-5" />} label="Profissão ou área" onChange={(event) => updateProfile({ profession: event.target.value })} placeholder="Ex: desenvolvedor, motorista, professora..." value={profile.profession ?? ""} />
    </>
  );
  if (step === 3) return (
    <>
      <OnboardingOption icon={<User size={22} />} label="Solteiro(a)" selected={profile.relationshipStatus === "single"} onPress={() => updateProfile({ relationshipStatus: "single" })} />
      <OnboardingOption icon={<Heart size={22} />} label="Em relacionamento sério" selected={profile.relationshipStatus === "serious_relationship"} onPress={() => updateProfile({ relationshipStatus: "serious_relationship" })} />
      <OnboardingOption icon={<Heart size={22} />} label="Casado(a)" selected={profile.relationshipStatus === "married"} onPress={() => updateProfile({ relationshipStatus: "married" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Outro" selected={profile.relationshipStatus === "other"} onPress={() => updateProfile({ relationshipStatus: "other" })} />
    </>
  );
  if (step === 4) return (
    <>
      <OnboardingOption icon={<Smile size={22} />} label="Não tenho dificuldade" selected={profile.hasRelationshipDifficulty === "no"} onPress={() => updateProfile({ hasRelationshipDifficulty: "no" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Às vezes sinto dificuldade" selected={profile.hasRelationshipDifficulty === "sometimes"} onPress={() => updateProfile({ hasRelationshipDifficulty: "sometimes" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Tenho dificuldade com frequência" selected={profile.hasRelationshipDifficulty === "often"} onPress={() => updateProfile({ hasRelationshipDifficulty: "often" })} />
    </>
  );
  if (step === 5) return (
    <>
      <OnboardingOption icon={<CheckCircle size={22} />} label="Estável" selected={profile.moodPattern === "stable"} onPress={() => updateProfile({ moodPattern: "stable" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Animado(a)" selected={profile.moodPattern === "motivated"} onPress={() => updateProfile({ moodPattern: "motivated" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Ansioso(a)" selected={profile.moodPattern === "anxious"} onPress={() => updateProfile({ moodPattern: "anxious" })} />
      <OnboardingOption icon={<Flame size={22} />} label="Irritado(a)" selected={profile.moodPattern === "irritated"} onPress={() => updateProfile({ moodPattern: "irritated" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Desanimado(a)" selected={profile.moodPattern === "discouraged"} onPress={() => updateProfile({ moodPattern: "discouraged" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Oscila bastante" selected={profile.moodPattern === "varies"} onPress={() => updateProfile({ moodPattern: "varies" })} />
    </>
  );
  if (step === 6) return (
    <>
      <QuestionSection title="Pergunta 1: quantos dias por semana?">
        <div className="grid grid-cols-5 gap-2">
          {[2, 3, 4, 5, 6].map((days) => (
            <OnboardingOption key={days} label={`${days}x`} selected={profile.trainingDaysPerWeek === days} onPress={() => updateProfile({ trainingDaysPerWeek: days as TrainingDaysPerWeek })} />
          ))}
        </div>
      </QuestionSection>
      <QuestionSection title="Pergunta 2: quanto tempo por treino?">
        <OnboardingOption icon={<Calendar size={22} />} label="Até 30 minutos" selected={profile.trainingDuration === "up_to_30"} onPress={() => updateProfile({ trainingDuration: "up_to_30" })} />
        <OnboardingOption icon={<Calendar size={22} />} label="30 a 45 minutos" selected={profile.trainingDuration === "30_to_45"} onPress={() => updateProfile({ trainingDuration: "30_to_45" })} />
        <OnboardingOption icon={<Calendar size={22} />} label="45 a 60 minutos" selected={profile.trainingDuration === "45_to_60"} onPress={() => updateProfile({ trainingDuration: "45_to_60" })} />
        <OnboardingOption icon={<Calendar size={22} />} label="Mais de 60 minutos" selected={profile.trainingDuration === "over_60"} onPress={() => updateProfile({ trainingDuration: "over_60" })} />
      </QuestionSection>
    </>
  );
  if (step === 7) return (
    <>
      <OnboardingOption icon={<Activity size={22} />} label="Manhã" selected={profile.preferredTrainingPeriod === "morning"} onPress={() => updateProfile({ preferredTrainingPeriod: "morning" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Tarde" selected={profile.preferredTrainingPeriod === "afternoon"} onPress={() => updateProfile({ preferredTrainingPeriod: "afternoon" })} />
      <OnboardingOption icon={<Moon size={22} />} label="Noite" selected={profile.preferredTrainingPeriod === "night"} onPress={() => updateProfile({ preferredTrainingPeriod: "night" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Varia conforme o dia" selected={profile.preferredTrainingPeriod === "varies"} onPress={() => updateProfile({ preferredTrainingPeriod: "varies" })} />
    </>
  );
  if (step === 8) return (
    <>
      <NumberInput helperText="Use seu peso atual, mesmo que seja aproximado." label="Peso atual" onChange={(weightKg) => updateProfile({ weightKg })} placeholder="Ex: 83" rightText="kg" value={profile.weightKg} />
      <NumberInput helperText="Informe sua altura em centímetros." label="Altura" onChange={(heightCm) => updateProfile({ heightCm })} placeholder="Ex: 170" rightText="cm" value={profile.heightCm} />
    </>
  );
  if (step === 9) return (
    <>
      <OnboardingOption icon={<Moon size={22} />} label="Menos de 5 horas" selected={profile.sleepHours === "less_than_5"} onPress={() => updateProfile({ sleepHours: "less_than_5" })} />
      <OnboardingOption icon={<Moon size={22} />} label="5 a 6 horas" selected={profile.sleepHours === "5_to_6"} onPress={() => updateProfile({ sleepHours: "5_to_6" })} />
      <OnboardingOption icon={<Bed size={22} />} label="7 a 8 horas" selected={profile.sleepHours === "7_to_8"} onPress={() => updateProfile({ sleepHours: "7_to_8" })} />
      <OnboardingOption icon={<Bed size={22} />} label="Mais de 8 horas" selected={profile.sleepHours === "more_than_8"} onPress={() => updateProfile({ sleepHours: "more_than_8" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Varia muito" selected={profile.sleepHours === "varies"} onPress={() => updateProfile({ sleepHours: "varies" })} />
    </>
  );
  if (step === 10) return (
    <>
      <OnboardingOption icon={<Smile size={22} />} label="Sim, na maioria dos dias" selected={profile.wakesUpRested === "yes"} onPress={() => updateProfile({ wakesUpRested: "yes" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Mais ou menos" selected={profile.wakesUpRested === "sometimes"} onPress={() => updateProfile({ wakesUpRested: "sometimes" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Quase nunca" selected={profile.wakesUpRested === "no"} onPress={() => updateProfile({ wakesUpRested: "no" })} />
    </>
  );
  if (step === 11) return (
    <>
      <OnboardingOption icon={<Flame size={22} />} label="Sim" selected={profile.smokes === "yes"} onPress={() => updateProfile({ smokes: "yes" })} />
      <OnboardingOption icon={<CheckCircle size={22} />} label="Não" selected={profile.smokes === "no"} onPress={() => updateProfile({ smokes: "no" })} />
      <OnboardingOption icon={<Apple size={22} />} label="Parei de fumar" selected={profile.smokes === "stopped"} onPress={() => updateProfile({ smokes: "stopped" })} />
    </>
  );
  if (step === 12) return (
    <>
      <OnboardingOption icon={<CheckCircle size={22} />} label="Não consumo" selected={profile.beerConsumption === "no"} onPress={() => updateProfile({ beerConsumption: "no" })} />
      <OnboardingOption icon={<Calendar size={22} />} label="Raramente" selected={profile.beerConsumption === "rarely"} onPress={() => updateProfile({ beerConsumption: "rarely" })} />
      <OnboardingOption icon={<Calendar size={22} />} label="1 a 2 vezes por semana" selected={profile.beerConsumption === "weekly_1_2"} onPress={() => updateProfile({ beerConsumption: "weekly_1_2" })} />
      <OnboardingOption icon={<BarChart3 size={22} />} label="3 ou mais vezes por semana" selected={profile.beerConsumption === "weekly_3_plus"} onPress={() => updateProfile({ beerConsumption: "weekly_3_plus" })} />
    </>
  );
  if (step === 13) return (
    <>
      <OnboardingOption icon={<CheckCircle size={22} />} label="Sim" selected={profile.drinksSoda === "yes"} onPress={() => updateProfile({ drinksSoda: "yes" })} />
      <OnboardingOption icon={<CheckCircle size={22} />} label="Não" selected={profile.drinksSoda === "no"} onPress={() => updateProfile({ drinksSoda: "no", sodaAmount: undefined, sodaFrequency: undefined })} />
    </>
  );
  if (step === 14) return (
    <>
      <OnboardingOption icon={<Calendar size={22} />} label="Raramente" selected={profile.sodaFrequency === "rarely"} onPress={() => updateProfile({ sodaFrequency: "rarely" })} />
      <OnboardingOption icon={<Calendar size={22} />} label="1 a 2 vezes por semana" selected={profile.sodaFrequency === "weekly_1_2"} onPress={() => updateProfile({ sodaFrequency: "weekly_1_2" })} />
      <OnboardingOption icon={<Calendar size={22} />} label="3 a 5 vezes por semana" selected={profile.sodaFrequency === "weekly_3_5"} onPress={() => updateProfile({ sodaFrequency: "weekly_3_5" })} />
      <OnboardingOption icon={<Calendar size={22} />} label="Todos os dias" selected={profile.sodaFrequency === "daily"} onPress={() => updateProfile({ sodaFrequency: "daily" })} />
    </>
  );
  if (step === 15) return (
    <>
      <OnboardingOption icon={<Activity size={22} />} label="Até 200 ml" selected={profile.sodaAmount === "up_to_200"} onPress={() => updateProfile({ sodaAmount: "up_to_200" })} />
      <OnboardingOption icon={<Activity size={22} />} label="200 a 350 ml" selected={profile.sodaAmount === "200_to_350"} onPress={() => updateProfile({ sodaAmount: "200_to_350" })} />
      <OnboardingOption icon={<Activity size={22} />} label="350 a 600 ml" selected={profile.sodaAmount === "350_to_600"} onPress={() => updateProfile({ sodaAmount: "350_to_600" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Mais de 600 ml" selected={profile.sodaAmount === "over_600"} onPress={() => updateProfile({ sodaAmount: "over_600" })} />
    </>
  );
  if (step === 16) return (
    <>
      <OnboardingOption icon={<BarChart3 size={22} />} label="Sim, acompanho com frequência" selected={profile.monitorsFood === "yes"} onPress={() => updateProfile({ monitorsFood: "yes" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Às vezes" selected={profile.monitorsFood === "sometimes"} onPress={() => updateProfile({ monitorsFood: "sometimes" })} />
      <OnboardingOption icon={<CheckCircle size={22} />} label="Não monitoro" selected={profile.monitorsFood === "no"} onPress={() => updateProfile({ monitorsFood: "no" })} />
    </>
  );
  if (step === 17) return (
    <>
      <OnboardingOption icon={<Activity size={22} />} label="Nunca treinei" selected={profile.gymExperience === "never"} onPress={() => updateProfile({ gymExperience: "never", previousTrainingTime: undefined })} />
      <OnboardingOption icon={<Activity size={22} />} label="Já treinei por pouco tempo" selected={profile.gymExperience === "short_time"} onPress={() => updateProfile({ gymExperience: "short_time" })} />
      <OnboardingOption icon={<Dumbbell size={22} />} label="Treinei por alguns meses" selected={profile.gymExperience === "few_months"} onPress={() => updateProfile({ gymExperience: "few_months" })} />
      <OnboardingOption icon={<Dumbbell size={22} />} label="Treinei por mais de 1 ano" selected={profile.gymExperience === "more_than_1_year"} onPress={() => updateProfile({ gymExperience: "more_than_1_year" })} />
      <OnboardingOption icon={<Dumbbell size={22} />} label="Já treino atualmente" selected={profile.gymExperience === "currently_training"} onPress={() => updateProfile({ gymExperience: "currently_training" })} />
    </>
  );
  if (step === 18) return (
    <>
      <OnboardingOption label="Menos de 3 meses" selected={profile.previousTrainingTime === "less_than_3_months"} onPress={() => updateProfile({ previousTrainingTime: "less_than_3_months" })} />
      <OnboardingOption label="3 a 6 meses" selected={profile.previousTrainingTime === "3_to_6_months"} onPress={() => updateProfile({ previousTrainingTime: "3_to_6_months" })} />
      <OnboardingOption label="6 a 12 meses" selected={profile.previousTrainingTime === "6_to_12_months"} onPress={() => updateProfile({ previousTrainingTime: "6_to_12_months" })} />
      <OnboardingOption label="1 a 2 anos" selected={profile.previousTrainingTime === "1_to_2_years"} onPress={() => updateProfile({ previousTrainingTime: "1_to_2_years" })} />
      <OnboardingOption label="Mais de 2 anos" selected={profile.previousTrainingTime === "more_than_2_years"} onPress={() => updateProfile({ previousTrainingTime: "more_than_2_years" })} />
    </>
  );
  if (step === 19) return (
    <>
      <OnboardingOption icon={<Trophy size={22} />} label="Sim" selected={profile.trainsProfessionally === "yes"} onPress={() => updateProfile({ trainsProfessionally: "yes" })} />
      <OnboardingOption icon={<BarChart3 size={22} />} label="Pretendo no futuro" selected={profile.trainsProfessionally === "moderate"} onPress={() => updateProfile({ trainsProfessionally: "moderate", professionalTrainingPurpose: undefined })} />
      <OnboardingOption icon={<CheckCircle size={22} />} label="Não" selected={profile.trainsProfessionally === "no"} onPress={() => updateProfile({ trainsProfessionally: "no", professionalTrainingPurpose: undefined })} />
    </>
  );
  if (step === 20) return (
    <>
      <OnboardingOption icon={<Trophy size={22} />} label="Competição esportiva" selected={profile.professionalTrainingPurpose === "competition"} onPress={() => updateProfile({ professionalTrainingPurpose: "competition" })} />
      <OnboardingOption icon={<Dumbbell size={22} />} label="Estética ou fisiculturismo" selected={profile.professionalTrainingPurpose === "bodybuilding"} onPress={() => updateProfile({ professionalTrainingPurpose: "bodybuilding" })} />
      <OnboardingOption icon={<BarChart3 size={22} />} label="Performance profissional" selected={profile.professionalTrainingPurpose === "professional_performance"} onPress={() => updateProfile({ professionalTrainingPurpose: "professional_performance" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Teste físico ou concurso" selected={profile.professionalTrainingPurpose === "physical_test"} onPress={() => updateProfile({ professionalTrainingPurpose: "physical_test" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Outro" selected={profile.professionalTrainingPurpose === "other"} onPress={() => updateProfile({ professionalTrainingPurpose: "other" })} />
    </>
  );
  if (step === 21) return (
    <>
      <OnboardingOption icon={<Apple size={22} />} label="Sim, quero dicas de alimentação" selected={profile.wantsNutritionTips === "yes"} onPress={() => updateProfile({ wantsNutritionTips: "yes" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Quero de forma moderada" selected={profile.wantsNutritionTips === "moderate"} onPress={() => updateProfile({ wantsNutritionTips: "moderate" })} />
      <OnboardingOption icon={<CheckCircle size={22} />} label="Não quero agora" selected={profile.wantsNutritionTips === "no"} onPress={() => updateProfile({ wantsNutritionTips: "no" })} />
    </>
  );
  if (step === 22) return (
    <>
      <OnboardingOption icon={<Activity size={22} />} label="Sim, quero receber" selected={profile.wantsDailyAdvice === "yes"} onPress={() => updateProfile({ wantsDailyAdvice: "yes" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Apenas quando fizer sentido" selected={profile.wantsDailyAdvice === "moderate"} onPress={() => updateProfile({ wantsDailyAdvice: "moderate" })} />
      <OnboardingOption icon={<CheckCircle size={22} />} label="Não quero agora" selected={profile.wantsDailyAdvice === "no"} onPress={() => updateProfile({ wantsDailyAdvice: "no" })} />
    </>
  );
  if (step === 23) return (
    <>
      <OnboardingOption icon={<Apple size={22} />} label="Sim, quero registrar" selected={profile.wantsMealPhotoDiary === "yes"} onPress={() => updateProfile({ wantsMealPhotoDiary: "yes" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Talvez depois" selected={profile.wantsMealPhotoDiary === "maybe_later"} onPress={() => updateProfile({ wantsMealPhotoDiary: "maybe_later" })} />
      <OnboardingOption icon={<Shield size={22} />} label="Não quero" selected={profile.wantsMealPhotoDiary === "no"} onPress={() => updateProfile({ wantsMealPhotoDiary: "no" })} />
    </>
  );
  if (step === 24) return (
    <>
      <OnboardingOption icon={<Camera size={22} />} label="Sim, quero acompanhar" selected={profile.wantsProgressPhotos === "yes"} onPress={() => updateProfile({ wantsProgressPhotos: "yes" })} />
      <OnboardingOption icon={<Activity size={22} />} label="Talvez depois" selected={profile.wantsProgressPhotos === "maybe_later"} onPress={() => updateProfile({ wantsProgressPhotos: "maybe_later" })} />
      <OnboardingOption icon={<Shield size={22} />} label="Não quero" selected={profile.wantsProgressPhotos === "no"} onPress={() => updateProfile({ wantsProgressPhotos: "no" })} />
    </>
  );
  return <SummaryStep profile={profile} />;
}

function NumberInput({ helperText, label, onChange, placeholder, rightText, value }: { helperText: string; label: string; onChange: (value: number | undefined) => void; placeholder: string; rightText: string; value?: number }) {
  return (
    <Input
      helperText={helperText}
      inputMode="decimal"
      label={label}
      onChange={(event) => {
        const text = event.target.value;
        onChange(text ? Number(text.replace(",", ".")) : undefined);
      }}
      placeholder={placeholder}
      rightText={rightText}
      value={value ? String(value) : ""}
    />
  );
}

function QuestionSection({ children, title }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="grid gap-2">
      <h2 className="text-[15px] font-extrabold leading-5 text-white">{title}</h2>
      <div className="grid gap-2">{children}</div>
    </section>
  );
}

function SummaryStep({ profile }: { profile: OnboardingProfile }) {
  const bmi = calculateBmi(profile.weightKg, profile.heightCm);
  const bmiResult = bmi ? getBmiResult(bmi) : null;
  const currentLevel = getCurrentJourneyLevel(profile);
  const [targetLevel, setTargetLevel] = useState(currentLevel === "performance" ? "performance" : "evolution");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  return (
    <div className="grid gap-4">
      <section className="overflow-hidden rounded-lg bg-[#202024]">
        <button
          aria-expanded={isSummaryOpen}
          className="flex min-h-[64px] w-full items-center justify-between gap-3 px-4 text-left active:opacity-80"
          onClick={() => setIsSummaryOpen((current) => !current)}
          type="button"
        >
          <div>
            <h2 className="text-base font-black text-white">Resumo das respostas</h2>
            <p className="text-sm text-[#C4C4CC]">8 itens preenchidos</p>
          </div>
          <ChevronDown className={`h-6 w-6 text-[#00B37E] transition-transform duration-300 ${isSummaryOpen ? "rotate-180" : ""}`} />
        </button>

        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isSummaryOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
              <SummaryRow label="Treinos" value={`${profile.trainingDaysPerWeek ?? "-"}x por semana`} />
              <SummaryRow label="Medidas" value={`${profile.weightKg ?? "-"} kg / ${profile.heightCm ?? "-"} cm`} />
              <SummaryRow label="Sono" value={profile.sleepHours ? labels[profile.sleepHours] : "-"} />
              <SummaryRow label="Humor" value={profile.moodPattern ? labels[profile.moodPattern] : "-"} />
              <SummaryRow label="Refrigerante" value={profile.drinksSoda === "yes" && profile.sodaFrequency ? labels[profile.sodaFrequency] : profile.drinksSoda ? labels[profile.drinksSoda] : "-"} />
              <SummaryRow label="Academia" value={profile.gymExperience ? labels[profile.gymExperience] : "-"} />
              <SummaryRow label="Profissional" value={profile.trainsProfessionally ? labels[profile.trainsProfessionally] : "-"} />
              <SummaryRow label="Fotos" value={profile.wantsProgressPhotos ? labels[profile.wantsProgressPhotos] : "-"} />
            </div>
          </div>
        </div>
      </section>
      <JourneyScale currentLevel={currentLevel} onTargetChange={setTargetLevel} targetLevel={targetLevel} />
      {bmiResult && bmi ? (
        <div className="grid gap-2 rounded-lg border bg-[#202024] p-4 text-center" style={{ borderColor: bmiResult.color }}>
          <p className="text-sm font-bold text-[#C4C4CC]">Seu IMC estimado</p>
          <p className="text-3xl font-black text-white">{bmi.toFixed(1)}</p>
          <p className="text-base font-black" style={{ color: bmiResult.color }}>
            {bmiResult.title}
          </p>
          <p className="text-sm leading-5 text-[#C4C4CC]">{bmiResult.description}</p>
          <div className="h-2 overflow-hidden rounded-full bg-[#18181B]">
            <div className="h-full rounded-full" style={{ backgroundColor: bmiResult.color, width: bmiResult.scaleWidth }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-[74px] flex-col items-center justify-center gap-1 rounded-md bg-[#18181B] p-2 text-center">
      <span className="text-sm font-black text-white">{label}</span>
      <span className="text-xs leading-4 text-[#C4C4CC]">{value}</span>
    </div>
  );
}

const journeyScaleLevels = [
  { description: "Começar com segurança", label: "Início", value: "start" },
  { description: "Manter rotina", label: "Constancia", value: "consistency" },
  { description: "Evoluir medidas e força", label: "Evolução", value: "evolution" },
  { description: "Treinar com alta exigencia", label: "Performance", value: "performance" },
] as const;

function JourneyScale({ currentLevel, onTargetChange, targetLevel }: { currentLevel: string; onTargetChange: (level: string) => void; targetLevel: string }) {
  const current = journeyScaleLevels.find((level) => level.value === currentLevel) ?? journeyScaleLevels[0];
  const target = journeyScaleLevels.find((level) => level.value === targetLevel) ?? journeyScaleLevels[2];

  return (
    <div className="grid gap-4 rounded-lg border border-[#29292E] bg-[#202024] p-4">
      <div className="text-center">
        <h2 className="text-base font-black text-white">Sua escala de evolução</h2>
        <p className="text-sm text-[#C4C4CC]">Toque para escolher onde quer chegar.</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {journeyScaleLevels.map((level) => {
          const selected = level.value === targetLevel;
          return (
            <button className="grid gap-2 text-center" key={level.value} onClick={() => onTargetChange(level.value)} type="button">
              <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-black ${selected ? "border-[#00B37E] bg-[#00875F] text-white" : "border-[#29292E] bg-[#18181B] text-[#C4C4CC]"}`}>
                {level.value === currentLevel ? "A" : selected ? "M" : ""}
              </span>
              <span className={`text-[11px] font-bold leading-4 ${selected ? "text-white" : "text-[#C4C4CC]"}`}>{level.label}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-lg bg-[#18181B] p-2">
          <p className="text-[11px] font-bold uppercase text-[#C4C4CC]">Atual</p>
          <p className="text-sm font-black text-white">{current.label}</p>
        </div>
        <div className="rounded-lg bg-[#18181B] p-2">
          <p className="text-[11px] font-bold uppercase text-[#C4C4CC]">Meta</p>
          <p className="text-sm font-black text-white">{target.label}</p>
        </div>
      </div>
      <p className="text-center text-sm text-[#C4C4CC]">{target.description}</p>
    </div>
  );
}

function getVisibleStepIndexes(profile: OnboardingProfile) {
  return steps
    .map((_, index) => index)
    .filter((index) => index !== previousTrainingStepIndex || profile.gymExperience !== "never")
    .filter((index) => index !== sodaFrequencyStepIndex || profile.drinksSoda === "yes")
    .filter((index) => index !== sodaAmountStepIndex || profile.drinksSoda === "yes")
    .filter((index) => index !== professionalPurposeStepIndex || profile.trainsProfessionally === "yes");
}

function isStepValid(step: number, profile: OnboardingProfile) {
  if (step === 0) return true;
  if (step === 1) return Boolean(profile.sex);
  if (step === 2) return Boolean(profile.workRoutine);
  if (step === 3) return Boolean(profile.relationshipStatus);
  if (step === 4) return Boolean(profile.hasRelationshipDifficulty);
  if (step === 5) return Boolean(profile.moodPattern);
  if (step === 6) return Boolean(profile.trainingDaysPerWeek && profile.trainingDuration);
  if (step === 7) return Boolean(profile.preferredTrainingPeriod);
  if (step === 8) return bodyMetricsSchema.safeParse(profile).success;
  if (step === 9) return Boolean(profile.sleepHours);
  if (step === 10) return Boolean(profile.wakesUpRested);
  if (step === 11) return Boolean(profile.smokes);
  if (step === 12) return Boolean(profile.beerConsumption);
  if (step === 13) return Boolean(profile.drinksSoda);
  if (step === 14) return Boolean(profile.sodaFrequency);
  if (step === 15) return Boolean(profile.sodaAmount);
  if (step === 16) return Boolean(profile.monitorsFood);
  if (step === 17) return Boolean(profile.gymExperience);
  if (step === 18) return Boolean(profile.gymExperience === "never" || profile.previousTrainingTime);
  if (step === 19) return Boolean(profile.trainsProfessionally);
  if (step === 20) return Boolean(profile.professionalTrainingPurpose);
  if (step === 21) return Boolean(profile.wantsNutritionTips);
  if (step === 22) return Boolean(profile.wantsDailyAdvice);
  if (step === 23) return Boolean(profile.wantsMealPhotoDiary);
  if (step === 24) return Boolean(profile.wantsProgressPhotos);
  return onboardingSchema.safeParse(profile).success;
}

function calculateBmi(weightKg?: number, heightCm?: number) {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function getCurrentJourneyLevel(profile: OnboardingProfile) {
  if (profile.trainsProfessionally === "yes" || profile.gymExperience === "currently_training") return "performance";
  if (profile.gymExperience === "more_than_1_year" || profile.gymExperience === "few_months") return "evolution";
  if (profile.gymExperience === "short_time" || (profile.trainingDaysPerWeek && profile.trainingDaysPerWeek >= 4)) return "consistency";
  return "start";
}

function getBmiResult(bmi: number) {
  if (bmi < 18.5) return { color: "#F5B041", description: "Seu corpo pode precisar de mais atenção com energia, força e alimentação.", scaleWidth: "28%", title: "Atenção ao ganho saudável" };
  if (bmi < 25) return { color: "#00B37E", description: "Boa base inicial. Agora o foco é consistência, evolução e qualidade de treino.", scaleWidth: "55%", title: "Faixa considerada adequada" };
  if (bmi < 30) return { color: "#F5B041", description: "Vale acompanhar evolução com calma e usar treino, sono e rotina a seu favor.", scaleWidth: "74%", title: "Ponto de atenção" };
  return { color: "#F75A68", description: "Vamos avançar com cuidado, metas realistas e acompanhamento consistente.", scaleWidth: "92%", title: "Atenção redobrada" };
}
