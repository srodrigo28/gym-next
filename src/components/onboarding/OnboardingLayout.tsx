import type { PropsWithChildren, ReactNode } from "react";
import { OnboardingIllustration } from "@/components/onboarding/OnboardingIllustration";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";

type IllustrationName = Parameters<typeof OnboardingIllustration>[0]["name"];

type OnboardingLayoutProps = PropsWithChildren<{
  currentStep: number;
  description: string;
  footer?: ReactNode;
  illustration: IllustrationName;
  title: string;
  totalSteps: number;
}>;

export function OnboardingLayout({ children, currentStep, description, footer, illustration, title, totalSteps }: OnboardingLayoutProps) {
  return (
    <section className="flex min-h-dvh flex-col bg-[#121214] px-5" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="grid gap-2 pt-4">
        <OnboardingProgress current={currentStep} total={totalSteps} />
        <div className="flex h-32 items-center justify-center overflow-hidden min-[390px]:h-40">
          <OnboardingIllustration name={illustration} />
        </div>
      </div>
      <div className="app-scroll min-h-0 flex-1 overflow-y-auto py-4">
        <header className="grid gap-2">
          <h1 className="text-[25px] font-extrabold leading-8 text-white">{title}</h1>
          <p className="text-base leading-6 text-[#C4C4CC]">{description}</p>
        </header>
        <div className="mt-6 grid gap-2">{children}</div>
      </div>
      {footer ? (
        <div className="pb-5 pt-2" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
          {footer}
        </div>
      ) : null}
    </section>
  );
}
