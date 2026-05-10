"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppLoading } from "@/components/app/AppLoading";
import { AuthBackground } from "@/components/auth/AuthBackground";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      router.replace("/login");
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [router]);

  return (
    <AuthBackground contentClassName="flex items-center justify-center">
      <AppLoading className="min-h-0 bg-transparent" message="Next Gyn" />
    </AuthBackground>
  );
}
