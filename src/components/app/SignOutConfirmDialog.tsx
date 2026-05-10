"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";

type SignOutConfirmDialogProps = {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function SignOutConfirmDialog({ isLoading, isOpen, onClose, onConfirm }: SignOutConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/70 px-4 pb-4 pt-10 backdrop-blur-sm" role="presentation">
      <div aria-labelledby="sign-out-title" aria-modal="true" className="w-full rounded-2xl border border-[#29292E] bg-[#202024] p-5 shadow-2xl shadow-black/50" role="dialog">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3B1F25] text-[#F75A68]">
          <LogOut className="h-7 w-7" />
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-xl font-black text-white" id="sign-out-title">Sair da conta?</h2>
          <p className="mt-2 text-sm leading-5 text-[#C4C4CC]">Voce voltara para a tela de login e podera acessar novamente quando quiser.</p>
        </div>

        <div className="mt-5 grid gap-3">
          <Button className="h-12 border-[#F75A68] bg-[#F75A68] text-base" icon={<LogOut className="h-5 w-5" />} loading={isLoading} onClick={onConfirm} title="Sim, sair" />
          <Button className="h-12 text-base" disabled={isLoading} onClick={onClose} title="Continuar no app" variant="outline" />
        </div>
      </div>
    </div>
  );
}
