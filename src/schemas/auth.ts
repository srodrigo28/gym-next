import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail.").email("Informe um e-mail valido."),
  password: z.string().min(1, "Informe sua senha."),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Informe seu nome."),
    email: z.string().min(1, "Informe seu e-mail.").email("Informe um e-mail valido."),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
    passwordConfirmation: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas precisam ser iguais.",
    path: ["passwordConfirmation"],
  });
