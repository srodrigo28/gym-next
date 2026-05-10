"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { getAuthSession } from "@/lib/auth";

export function useRequireAuth() {
  const router = useRouter();
  const session = useMemo(() => getAuthSession(), []);

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [router, session]);

  return { isChecking: false, session };
}
