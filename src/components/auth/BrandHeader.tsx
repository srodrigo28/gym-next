import { Dumbbell } from "lucide-react";

type BrandHeaderProps = {
  compact?: boolean;
};

export function BrandHeader({ compact = false }: BrandHeaderProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${compact ? "mb-8 mt-4" : "mb-12 mt-8"}`}>
      <div className="flex items-center gap-4">
        <Dumbbell className="h-10 w-10 text-[#00B37E]" />
        <h1 className="text-[32px] font-bold text-white">Next Gyn</h1>
      </div>
      <p className="text-center text-lg text-[#C4C4CC]">Treine sua mente e o seu corpo</p>
    </div>
  );
}
