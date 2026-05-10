import { Dumbbell, Weight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export type ExerciseMedia = {
  alt?: string;
  label: string;
  src?: string;
  type: "image" | "video";
};

export type ExerciseDetail = {
  group: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  id: string;
  instructions: string[];
  media: ExerciseMedia[];
  repetitions: number;
  restSeconds: number;
  series: number;
  subtitle: string;
  title: string;
  tone: string;
};

const defaultInstructions = [
  "Ajuste o equipamento antes de iniciar o movimento.",
  "Mantenha a postura estável durante toda a execução.",
  "Controle a volta e evite soltar o peso de uma vez.",
  "Pare se sentir dor fora do esforço normal do treino.",
];

function createMedia(id: string): ExerciseMedia[] {
  return [
    { alt: "Imagem da posição inicial do exercício", label: "Imagem 1", src: `/treinos/${id}-1.jpg`, type: "image" },
    { alt: "Imagem da posição final do exercício", label: "Imagem 2", src: `/treinos/${id}-2.jpg`, type: "image" },
    { label: "Vídeo", src: `/treinos/${id}.mp4`, type: "video" },
  ];
}

export const exercises: ExerciseDetail[] = [
  {
    group: "Costas",
    icon: Weight,
    id: "puxada-frontal",
    instructions: [
      "Mantenha a coluna estável e o peito aberto.",
      "Puxe a barra até a altura do peito.",
      "Evite jogar o tronco para trás durante a puxada.",
      "Controle a volta até os braços quase estenderem.",
    ],
    media: createMedia("puxada-frontal"),
    repetitions: 12,
    restSeconds: 60,
    series: 3,
    subtitle: "3 séries x 12 repetições",
    title: "Puxada frontal",
    tone: "#0E7490",
  },
  {
    group: "Costas",
    icon: Dumbbell,
    id: "remada-curvada",
    instructions: defaultInstructions,
    media: createMedia("remada-curvada"),
    repetitions: 12,
    restSeconds: 60,
    series: 3,
    subtitle: "3 séries x 12 repetições",
    title: "Remada curvada",
    tone: "#7C3AED",
  },
  {
    group: "Bíceps",
    icon: Dumbbell,
    id: "rosca-direta",
    instructions: defaultInstructions,
    media: createMedia("rosca-direta"),
    repetitions: 12,
    restSeconds: 60,
    series: 3,
    subtitle: "3 séries x 12 repetições",
    title: "Rosca direta",
    tone: "#7C3AED",
  },
];

export function findExerciseById(id?: string) {
  return exercises.find((exercise) => exercise.id === id) ?? exercises[0];
}
