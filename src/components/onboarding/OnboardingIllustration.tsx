type IllustrationName = "welcome" | "sex" | "work" | "training" | "metrics" | "sleep" | "history" | "nutrition" | "photos" | "summary";

type OnboardingIllustrationProps = {
  compact?: boolean;
  name: IllustrationName;
};

const labels: Record<IllustrationName, string> = {
  welcome: ":)",
  sex: "id",
  work: "job",
  training: "fit",
  metrics: "kg",
  sleep: "zz",
  history: "12",
  nutrition: "yum",
  photos: "cam",
  summary: "ok",
};

export function OnboardingIllustration({ compact = false, name }: OnboardingIllustrationProps) {
  return (
    <svg aria-hidden className="w-full" height={compact ? 104 : 148} viewBox="0 0 320 180" role="img">
      <circle cx="160" cy="90" fill="#1C1C20" r="78" />
      <circle cx="92" cy="48" fill="#00B37E" opacity="0.28" r="10" />
      <circle cx="235" cy="138" fill="#00B37E" opacity="0.18" r="14" />
      <rect x="104" y="50" width="112" height="88" rx="18" fill="#2A2A2E" stroke="#00B37E" strokeWidth="4" />
      <circle cx="160" cy="80" r="24" fill="#00B37E" />
      <path d="M124 132c10-26 62-26 72 0" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="10" />
      <text x="160" y="113" fill="#FFFFFF" fontSize="22" fontWeight="700" textAnchor="middle">
        {labels[name]}
      </text>
    </svg>
  );
}
