type OnboardingProgressProps = {
  current: number;
  total: number;
};

export function OnboardingProgress({ current, total }: OnboardingProgressProps) {
  const width = `${(current / total) * 100}%`;

  return (
    <div className="grid gap-2">
      <div className="flex justify-between text-sm">
        <span className="font-bold text-white">Etapa {current}</span>
        <span className="text-[#C4C4CC]">de {total}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#202024]">
        <div className="h-full rounded-full bg-[#00B37E] transition-[width] duration-300" style={{ width }} />
      </div>
    </div>
  );
}
