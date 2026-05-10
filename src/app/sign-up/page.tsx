"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Dumbbell, Lock, Mail, ShieldCheck, User, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signUp } from "@/lib/auth";
import { notifyAppError, notifyFormErrors } from "@/lib/formFeedback";
import { signUpSchema } from "@/schemas/auth";
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
      notifyAppError(error, "Não foi possível criar sua conta.");
      setError("root", {
        message: error instanceof Error ? error.message : "Não foi possível criar sua conta.",
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
            "linear-gradient(180deg, rgba(18,18,20,0.72) 0%, rgba(18,18,20,0.48) 31%, rgba(18,18,20,0.76) 52%, #121214 74%), linear-gradient(90deg, rgba(18,18,20,0.30), rgba(18,18,20,0.10)), url('/signup-bg.jpg')",
          backgroundPosition: "center top",
        }}
      />

      <form
        className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-6"
        noValidate
        onSubmit={handleSubmit(handleSignUp, notifyFormErrors)}
        style={{
          paddingBottom: "max(64px, env(safe-area-inset-bottom))",
          paddingTop: "max(88px, env(safe-area-inset-top))",
        }}
      >
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4">
            <Dumbbell className="h-11 w-11 text-[#00B37E] drop-shadow-lg" />
            <h1 className="text-[40px] font-extrabold leading-none text-white drop-shadow-lg">Next Gyn</h1>
          </div>
          <p className="mt-4 text-[22px] leading-7 text-white/90 drop-shadow">Treine sua mente e o seu corpo</p>
        </header>

        <div className="mx-auto mt-auto grid w-full max-w-[360px] gap-6">
          <div className="grid gap-4">
            <h2
              className="text-center text-[30px] font-extrabold leading-9 text-white"
              style={{ textShadow: "0 5px 12px rgba(0,0,0,0.65)" }}
            >
              Crie sua conta
            </h2>

            <div className="grid gap-3.5">
              <Input
                className="h-14 rounded-lg border-[#00B37E] bg-[#151517]/95 px-4 backdrop-blur-sm focus-within:border-[#00B37E]"
                error={errors.name?.message}
                icon={<User className="h-5 w-5" />}
                placeholder="Nome"
                {...register("name")}
              />
              <Input
                autoComplete="email"
                className="h-14 rounded-lg border-[#00B37E] bg-[#151517]/95 px-4 backdrop-blur-sm focus-within:border-[#00B37E]"
                error={errors.email?.message}
                icon={<Mail className="h-5 w-5" />}
                placeholder="E-mail"
                type="email"
                {...register("email")}
              />
              <Input
                className="h-14 rounded-lg border-[#00B37E] bg-[#151517]/95 px-4 backdrop-blur-sm focus-within:border-[#00B37E]"
                error={errors.password?.message}
                icon={<Lock className="h-5 w-5" />}
                placeholder="Senha"
                type="password"
                {...register("password")}
              />
              <Input
                className="h-14 rounded-lg border-[#00B37E] bg-[#151517]/95 px-4 backdrop-blur-sm focus-within:border-[#00B37E]"
                error={errors.passwordConfirmation?.message}
                icon={<ShieldCheck className="h-5 w-5" />}
                placeholder="Confirme a senha"
                type="password"
                {...register("passwordConfirmation")}
              />
            </div>

            {errors.root?.message ? <p className="text-center text-sm text-[#F75A68]">{errors.root.message}</p> : null}
            <div className="grid grid-cols-2 gap-3">
              <Link className="block w-full min-w-0" href="/login">
                <Button
                  className="!h-11 !min-h-11 rounded-lg border-[#00B37E] bg-[#121214]/55 py-0 text-base backdrop-blur-sm"
                  icon={<ArrowLeft className="h-5 w-5" />}
                  title="Voltar"
                  variant="outline"
                />
              </Link>
              <Button
                className="!h-11 !min-h-11 rounded-lg py-0 text-base"
                icon={<UserPlus className="h-5 w-5" />}
                loading={isSubmitting}
                title="Criar"
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}


