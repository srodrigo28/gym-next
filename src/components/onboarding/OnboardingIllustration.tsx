type IllustrationName =
  | "welcome"
  | "sex"
  | "work"
  | "training"
  | "metrics"
  | "sleep"
  | "history"
  | "nutrition"
  | "photos"
  | "summary";

type OnboardingIllustrationProps = {
  compact?: boolean;
  name: IllustrationName;
};

const primary = "#00B37E";
const background = "#121214";
const panel = "#2A2A2E";
const white = "#FFFFFF";

export function OnboardingIllustration({ compact = false, name }: OnboardingIllustrationProps) {
  return (
    <svg aria-hidden className="w-full" height={compact ? 104 : 148} viewBox="0 0 320 180" role="img">
      <circle cx="160" cy="90" fill="#1C1C20" r="78" />
      <circle cx="92" cy="48" fill={primary} opacity="0.28" r="10" />
      <circle cx="235" cy="138" fill={primary} opacity="0.18" r="14" />

      {name === "welcome" ? <Welcome /> : null}
      {name === "sex" ? <Sex /> : null}
      {name === "work" ? <Work /> : null}
      {name === "training" ? <Training /> : null}
      {name === "metrics" ? <Metrics /> : null}
      {name === "sleep" ? <Sleep /> : null}
      {name === "history" ? <History /> : null}
      {name === "nutrition" ? <Nutrition /> : null}
      {name === "photos" ? <Photos /> : null}
      {name === "summary" ? <Summary /> : null}
    </svg>
  );
}

function Welcome() {
  return (
    <g>
      <circle cx="160" cy="78" fill={primary} r="28" />
      <path d="M118 130c10-28 74-28 84 0" fill="none" stroke={white} strokeLinecap="round" strokeWidth="12" />
      <text x="160" y="84" fill={background} fontSize="24" fontWeight="700" textAnchor="middle">
        :)
      </text>
    </g>
  );
}

function Sex() {
  return (
    <g>
      <circle cx="132" cy="78" fill={primary} r="24" />
      <circle cx="188" cy="78" fill={panel} r="24" stroke={primary} strokeWidth="4" />
      <path d="M112 130c10-24 38-24 48 0M168 130c10-24 38-24 48 0" stroke={white} strokeLinecap="round" strokeWidth="10" />
    </g>
  );
}

function Work() {
  return (
    <g>
      <rect x="110" y="58" width="100" height="74" rx="12" fill={panel} stroke={primary} strokeWidth="4" />
      <rect x="136" y="44" width="48" height="22" rx="7" fill={primary} />
      <line x1="126" y1="90" x2="194" y2="90" stroke={white} strokeLinecap="round" strokeWidth="8" />
      <text x="160" y="121" fill={white} fontSize="18" textAnchor="middle">
        job
      </text>
    </g>
  );
}

function Training() {
  return (
    <g>
      <line x1="100" y1="94" x2="220" y2="94" stroke={primary} strokeLinecap="round" strokeWidth="12" />
      <rect x="82" y="68" width="18" height="52" rx="5" fill={white} />
      <rect x="220" y="68" width="18" height="52" rx="5" fill={white} />
      <circle cx="160" cy="54" fill={primary} r="18" />
      <path d="M134 140c8-28 44-28 52 0" stroke={white} strokeLinecap="round" strokeWidth="10" />
    </g>
  );
}

function Metrics() {
  return (
    <g>
      <rect x="104" y="54" width="112" height="92" rx="18" fill={panel} stroke={primary} strokeWidth="4" />
      <path d="M126 86c18-18 50-18 68 0" stroke={white} strokeLinecap="round" strokeWidth="8" />
      <line x1="160" y1="88" x2="174" y2="72" stroke={primary} strokeLinecap="round" strokeWidth="6" />
      <text x="160" y="126" fill={white} fontSize="18" fontWeight="700" textAnchor="middle">
        kg/cm
      </text>
    </g>
  );
}

function Sleep() {
  return (
    <g>
      <path d="M132 52c-18 42 12 78 54 76-12 10-28 16-46 16-38 0-68-30-68-68 0-18 7-34 18-46 0 38 22 60 42 22z" fill={primary} />
      <text x="206" y="76" fill={white} fontSize="28" fontWeight="700">
        z
      </text>
      <text x="228" y="55" fill={white} fontSize="18" fontWeight="700">
        z
      </text>
    </g>
  );
}

function History() {
  return (
    <g>
      <circle cx="160" cy="94" fill={panel} r="48" stroke={primary} strokeWidth="5" />
      <line x1="160" y1="94" x2="160" y2="66" stroke={white} strokeLinecap="round" strokeWidth="8" />
      <line x1="160" y1="94" x2="184" y2="110" stroke={white} strokeLinecap="round" strokeWidth="8" />
      <path d="M112 50l-12-8M208 50l12-8" stroke={primary} strokeLinecap="round" strokeWidth="7" />
    </g>
  );
}

function Nutrition() {
  return (
    <g>
      <path d="M132 62c26-28 78 2 48 46-14 20-32 34-48 42-16-8-34-22-48-42-30-44 22-74 48-46z" fill={primary} />
      <path d="M184 52c18-18 34-12 42-2-15 2-28 8-42 26z" fill={white} />
      <text x="132" y="110" fill={background} fontSize="22" fontWeight="700" textAnchor="middle">
        yum
      </text>
    </g>
  );
}

function Photos() {
  return (
    <g>
      <rect x="100" y="58" width="120" height="82" rx="14" fill={panel} stroke={primary} strokeWidth="4" />
      <circle cx="160" cy="98" fill={primary} r="24" />
      <circle cx="160" cy="98" fill={background} r="10" />
      <rect x="128" y="44" width="64" height="20" rx="8" fill={white} />
    </g>
  );
}

function Summary() {
  return (
    <g>
      <rect x="104" y="42" width="112" height="106" rx="14" fill={panel} stroke={primary} strokeWidth="4" />
      <line x1="128" y1="74" x2="190" y2="74" stroke={white} strokeLinecap="round" strokeWidth="7" />
      <line x1="128" y1="100" x2="178" y2="100" stroke={white} strokeLinecap="round" strokeWidth="7" />
      <line x1="128" y1="126" x2="194" y2="126" stroke={white} strokeLinecap="round" strokeWidth="7" />
      <path d="M212 50l12 12 26-30" fill="none" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    </g>
  );
}
