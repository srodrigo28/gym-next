"use client";

type AppLoadingProps = {
  className?: string;
  message?: string;
};

export function AppLoading({ className = "", message = "Carregando" }: AppLoadingProps) {
  return (
    <div className={`flex min-h-dvh flex-col items-center justify-center bg-[#121214] px-10 text-center text-white ${className}`}>
      <div className="app-loading-mark relative flex h-28 w-28 items-center justify-center">
        <svg aria-hidden className="h-24 w-24 drop-shadow-[0_0_18px_rgba(0,179,126,0.35)]" fill="none" viewBox="0 0 112 112">
          <path
            d="M35 72c-10-1-17-7-18-16-1-9 4-17 13-19 8-2 15 2 19 10l2 4 12-13-4-2c-8-4-12-11-10-19 2-9 10-14 19-13 9 1 15 8 16 18 8 0 14 4 16 12 2 8-1 15-8 20-7 4-14 3-20-2l-4-3-13 13 3 4c5 6 6 13 2 20-5 7-12 10-20 8-7-2-12-8-12-16"
            stroke="#00B37E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="13"
          />
          <path
            d="M24 61c6 2 11 6 14 12m38-45c7 3 11 7 13 14m-53 8 26 25m8-44 26 25"
            stroke="#00E09B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="7"
          />
        </svg>
      </div>

      <div className="mt-5 h-2 w-[80%] max-w-[344px] overflow-hidden rounded-full bg-[#29292E]">
        <div className="app-loading-bar h-full rounded-full bg-[#00B37E]" />
      </div>

      <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-[#C4C4CC]">{message}</p>
    </div>
  );
}
