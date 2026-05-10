"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dumbbell, Lock, Mail, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "@/lib/auth";
import { signInSchema } from "@/schemas/auth";
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
        message: error instanceof Error ? error.message : "Não foi possível acessar sua conta.",
      });
    }
  }

  return (
    <section className="relative min-h-dvh overflow-hidden bg-[#121214]">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(18,18,20,0.68) 0%, rgba(18,18,20,0.42) 32%, rgba(18,18,20,0.72) 56%, #121214 73%), linear-gradient(90deg, rgba(18,18,20,0.28), rgba(18,18,20,0.10)), url('/login-bg.jpg')",
        }}
      />

      <form
        className="relative z-10 flex min-h-dvh flex-col px-10"
        noValidate
        onSubmit={handleSubmit(handleSignIn)}
        style={{
          paddingBottom: "max(80px, env(safe-area-inset-bottom))",
          paddingTop: "max(80px, env(safe-area-inset-top))",
        }}
      >
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center gap-5">
            <Dumbbell className="h-11 w-11 text-[#00B37E]" />
            <h1 className="text-[42px] font-extrabold leading-none text-white drop-shadow-lg">Next Gyn</h1>
          </div>
          <p className="mt-5 text-[22px] leading-7 text-white/90 drop-shadow">Treine sua mente e o seu corpo</p>
        </header>

        <div className="mt-auto grid gap-7">
          <div className="grid gap-4">
            <h2 className="text-center text-[22px] font-normal leading-7 text-white drop-shadow-lg">
              Acesse sua conta
            </h2>

            <div className="grid gap-4">
              <Input
                autoComplete="email"
                className="h-16 rounded-lg border-[#00B37E] bg-[#151517]/92 px-4 backdrop-blur-sm focus-within:border-[#00B37E]"
                error={errors.email?.message}
                icon={<Mail className="h-6 w-6" />}
                placeholder="E-mail"
                type="email"
                {...register("email")}
              />
              <Input
                className="h-16 rounded-lg border-[#00B37E] bg-[#151517]/92 px-4 backdrop-blur-sm focus-within:border-[#00B37E]"
                error={errors.password?.message}
                icon={<Lock className="h-6 w-6" />}
                placeholder="Senha"
                type="password"
                {...register("password")}
              />
            </div>

            {errors.root?.message ? <p className="text-center text-sm text-[#F75A68]">{errors.root.message}</p> : null}
            <Button className="!h-11 !min-h-11 rounded-lg py-0 text-base" loading={isSubmitting} title="Acessar" type="submit" />
          </div>

          <div className="grid gap-5">
            <p className="text-center text-lg font-normal leading-6 text-white/85">Ainda não tem acesso?</p>
            <Link href="/sign-up">
              <Button
                className="!h-11 !min-h-11 rounded-lg border-[#00B37E] bg-[#121214]/55 py-0 text-base backdrop-blur-sm"
                icon={<UserPlus className="h-6 w-6" />}
                title="Criar conta"
                variant="outline"
              />
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
