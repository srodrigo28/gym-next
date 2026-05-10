"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Dumbbell } from "lucide-react";
import { AuthBackground } from "@/components/auth/AuthBackground";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      router.replace("/login");
    }, 1200);

    return () => window.clearTimeout(timeout);
  }, [router]);

  return (
    <AuthBackground contentClassName="flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Dumbbell className="h-14 w-14 text-[#00B37E]" />
        <h1 className="text-[42px] font-bold text-white">Ignite Gym</h1>
        <p className="text-lg text-[#C4C4CC]">Treine sua mente e o seu corpo</p>
      </div>
    </AuthBackground>
  );
}
