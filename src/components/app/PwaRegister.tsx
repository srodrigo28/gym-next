"use client";

import Image from "next/image";
import { Download, Share, Smartphone, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const DISMISSED_KEY = "next-gyn-install-dismissed-at";
const DISMISSED_DAYS = 7;

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

function isIosDevice() {
  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

function wasRecentlyDismissed() {
  const dismissedAt = window.localStorage.getItem(DISMISSED_KEY);
  if (!dismissedAt) return false;

  const elapsed = Date.now() - Number(dismissedAt);
  return elapsed < DISMISSED_DAYS * 24 * 60 * 60 * 1000;
}

export function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const canShowPrompt = useMemo(() => Boolean(installPrompt || showIosHelp), [installPrompt, showIosHelp]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (isStandalone() || !isMobileDevice() || wasRecentlyDismissed()) {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      window.setTimeout(() => setIsVisible(true), 450);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (isIosDevice()) {
      window.setTimeout(() => {
        if (!isStandalone() && !wasRecentlyDismissed()) {
          setShowIosHelp(true);
          setIsVisible(true);
        }
      }, 900);
    }

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    if (!canShowPrompt) {
      setIsVisible(false);
    }
  }, [canShowPrompt]);

  async function handleInstall() {
    if (showIosHelp && !installPrompt) {
      return;
    }

    if (!installPrompt) return;

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    setIsVisible(false);

    if (choice.outcome === "dismissed") {
      window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    }
  }

  function handleDismiss() {
    window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setInstallPrompt(null);
    setShowIosHelp(false);
    setIsVisible(false);
  }

  if (!canShowPrompt) return null;

  return (
    <div className={`pwa-install-shell ${isVisible ? "pwa-install-shell-visible" : ""}`} aria-live="polite">
      <div className="pwa-install-card">
        <button aria-label="Fechar sugestao de instalacao" className="pwa-install-close" onClick={handleDismiss} type="button">
          <X className="h-5 w-5" />
        </button>

        <div className="pwa-install-icon">
          <Image alt="" height={48} src="/icons/icon-192.png" width={48} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-white">Instalar Next Gyn</p>
          {showIosHelp && !installPrompt ? (
            <p className="mt-1 text-xs leading-4 text-[#C4C4CC]">
              Toque em <Share className="inline h-3.5 w-3.5" /> e escolha Adicionar a Tela de Inicio.
            </p>
          ) : (
            <p className="mt-1 text-xs leading-4 text-[#C4C4CC]">Abra mais rapido, em tela cheia e com melhor experiencia mobile.</p>
          )}
        </div>

        {showIosHelp && !installPrompt ? (
          <div className="pwa-install-hint" aria-hidden>
            <Smartphone className="h-5 w-5" />
          </div>
        ) : (
          <button className="pwa-install-action" onClick={handleInstall} type="button">
            <Download className="h-5 w-5" />
            Instalar
          </button>
        )}
      </div>
    </div>
  );
}
