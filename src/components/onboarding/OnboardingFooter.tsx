"use client";

import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

type OnboardingFooterProps = {
  canGoBack: boolean;
  canGoNext: boolean;
  loading?: boolean;
  nextLabel?: string;
  onBack: () => void;
  onNext: () => void;
};

export function OnboardingFooter({ canGoBack, canGoNext, loading, nextLabel = "Continuar", onBack, onNext }: OnboardingFooterProps) {
  const icon = nextLabel === "Finalizar" ? <CheckCircle className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />;

  if (!canGoBack) {
    return (
      <Button
        className="h-[52px]"
        disabled={!canGoNext}
        icon={icon}
        loading={loading}
        onClick={onNext}
        title={nextLabel}
      />
    );
  }

  return (
    <div className="flex gap-2">
      <div className="flex-[0.9]">
        <Button className="h-[52px] text-base" icon={<ArrowLeft className="h-5 w-5" />} onClick={onBack} title="Voltar" variant="outline" />
      </div>
      <div className="flex-[1.1]">
        <Button className="h-[52px] text-base" disabled={!canGoNext} icon={icon} loading={loading} onClick={onNext} title={nextLabel} />
      </div>
    </div>
  );
}
