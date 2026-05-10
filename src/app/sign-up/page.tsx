"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock, Mail, ShieldCheck, User, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthBackground } from "@/components/auth/AuthBackground";
import { BrandHeader } from "@/components/auth/BrandHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signUpSchema } from "@/schemas/auth";
import { signUp } from "@/lib/auth";
import type { SignUpPayload } from "@/types/auth";

export default function SignUpPage() {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<SignUpPayload>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", name: "", password: "", passwordConfirmation: "" },
  });

  async function handleSignUp(payload: SignUpPayload) {
    try {
      await signUp(payload);
      router.replace("/onboarding");
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Nao foi possivel criar sua conta.",
      });
    }
  }

  return (
    <AuthBackground>
      <form className="flex min-h-dvh flex-col justify-between px-8 py-10" onSubmit={handleSubmit(handleSignUp)}>
        <div>
          <BrandHeader compact />
          <div className="grid gap-4">
            <h1 className="mb-2 text-center text-[28px] font-bold text-white">Crie sua conta</h1>
            <Input error={errors.name?.message} icon={<User className="h-5 w-5" />} placeholder="Nome" {...register("name")} />
            <Input autoComplete="email" error={errors.email?.message} icon={<Mail className="h-5 w-5" />} placeholder="E-mail" type="email" {...register("email")} />
            <Input error={errors.password?.message} icon={<Lock className="h-5 w-5" />} placeholder="Senha" type="password" {...register("password")} />
            <Input error={errors.passwordConfirmation?.message} icon={<ShieldCheck className="h-5 w-5" />} placeholder="Confirme a senha" type="password" {...register("passwordConfirmation")} />
            {errors.root?.message ? <p className="text-center text-sm text-[#F75A68]">{errors.root.message}</p> : null}
            <Button icon={<UserPlus className="h-5 w-5" />} loading={isSubmitting} title="Criar e acessar" type="submit" />
          </div>
        </div>
        <Link className="mt-8 block" href="/login">
          <Button icon={<ArrowLeft className="h-5 w-5" />} title="Voltar para o login" variant="outline" />
        </Link>
      </form>
    </AuthBackground>
  );
}
