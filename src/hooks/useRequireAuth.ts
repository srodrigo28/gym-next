"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth";
import type { AuthResponse } from "@/types/auth";

export function useRequireAuth() {
  const router = useRouter();
  const [session, setSession] = useState<AuthResponse | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const currentSession = getAuthSession();

      if (!currentSession) {
        router.replace("/login");
        return;
      }

      setSession(currentSession);
      setIsChecking(false);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [router]);

  return { isChecking, session };
}
