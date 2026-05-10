"use client";

import Image from "next/image";
import { Download, Share, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const DISMISSED_KEY = "next-gyn-install-dismissed-at-v4";
const DISMISSED_DAYS = 7;

function isStandalone() {
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true;
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

function isIosDevice() {
  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

function isIosSafari() {
  const userAgent = window.navigator.userAgent;
  return isIosDevice() && /Safari/i.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent);
}

function wasRecentlyDismissed() {
  const dismissedAt = window.localStorage.getItem(DISMISSED_KEY);
  if (!dismissedAt) return false;

  const elapsed = Date.now() - Number(dismissedAt);
  return elapsed < DISMISSED_DAYS * 24 * 60 * 60 * 1000;
}

export function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showManualHelp, setShowManualHelp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const canShowPrompt = Boolean(installPrompt || showManualHelp);
  const isIos = typeof window !== "undefined" && isIosDevice();
  const isSafari = typeof window !== "undefined" && isIosSafari();
  const isManualIos = showManualHelp && !installPrompt && isIos;

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

    const fallbackTimer = window.setTimeout(
      () => {
        if (!isStandalone() && !wasRecentlyDismissed()) {
          setShowManualHelp(true);
          setIsVisible(true);
        }
      },
      isIosDevice() ? 900 : 1600,
    );

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    setIsVisible(false);

    if (choice.outcome === "dismissed") {
      window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } else {
      setShowManualHelp(false);
    }
  }

  function handleDismiss() {
    window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setInstallPrompt(null);
    setShowManualHelp(false);
    setIsVisible(false);
  }

  if (!canShowPrompt) return null;

  return (
    <div className={`pwa-install-shell ${isVisible ? "pwa-install-shell-visible" : ""}`} aria-live="polite">
      <div className={`pwa-install-card ${isManualIos ? "pwa-install-card-expanded" : ""}`}>
        <button aria-label="Fechar sugestão de instalação" className="pwa-install-close" onClick={handleDismiss} type="button">
          <X className="h-5 w-5" />
        </button>

        <div className="pwa-install-icon">
          <Image alt="" height={48} src="/icons/icon-192.png" width={48} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-white">{isIos ? "Adicionar Next Gyn" : "Instalar Next Gyn"}</p>
          {showManualHelp && !installPrompt ? (
            <div className="mt-1 text-xs leading-4 text-[#C4C4CC]">
              {isIos && !isSafari ? (
                <p>Abra esta página no Safari. O iPhone só adiciona PWA à tela inicial pelo Safari.</p>
              ) : isIos ? (
                <ol className="pwa-install-steps">
                  <li>Toque em compartilhar <Share className="inline h-3.5 w-3.5" />.</li>
                  <li>Escolha “Adicionar à Tela de Início”.</li>
                  <li>Toque em “Adicionar”.</li>
                </ol>
              ) : (
                <p>Toque no menu do navegador e escolha Instalar app.</p>
              )}
            </div>
          ) : (
            <p className="mt-1 text-xs leading-4 text-[#C4C4CC]">Abra mais rápido, em tela cheia e com melhor experiência mobile.</p>
          )}
        </div>

        {showManualHelp && !installPrompt ? (
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
