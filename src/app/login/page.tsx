"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LogIn, Mail, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthBackground } from "@/components/auth/AuthBackground";
import { BrandHeader } from "@/components/auth/BrandHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signInSchema } from "@/schemas/auth";
import { signIn } from "@/lib/auth";
import type { SignInPayload } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<SignInPayload>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleSignIn(payload: SignInPayload) {
    try {
      await signIn(payload);
      router.replace("/home");
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Nao foi possivel acessar sua conta.",
      });
    }
  }

  return (
    <AuthBackground>
      <form className="flex min-h-dvh flex-col justify-between px-8 py-12" onSubmit={handleSubmit(handleSignIn)}>
        <div>
          <BrandHeader />
          <div className="grid gap-4">
            <h1 className="mb-2 text-center text-[28px] font-bold text-white">Acesse sua conta</h1>
            <Input autoComplete="email" error={errors.email?.message} icon={<Mail className="h-5 w-5" />} placeholder="E-mail" type="email" {...register("email")} />
            <Input error={errors.password?.message} icon={<Lock className="h-5 w-5" />} placeholder="Senha" type="password" {...register("password")} />
            {errors.root?.message ? <p className="text-center text-sm text-[#F75A68]">{errors.root.message}</p> : null}
            <Button icon={<LogIn className="h-5 w-5" />} loading={isSubmitting} title="Acessar" type="submit" />
          </div>
        </div>
        <div className="mt-12 grid gap-4">
          <p className="text-center text-lg text-[#C4C4CC]">Ainda nao tem acesso?</p>
          <Link href="/sign-up">
            <Button icon={<UserPlus className="h-5 w-5" />} title="Criar conta" variant="outline" />
          </Link>
        </div>
      </form>
    </AuthBackground>
  );
}
