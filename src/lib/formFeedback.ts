import type { FieldErrors, FieldValues } from "react-hook-form";
import { toast } from "sonner";

const FALLBACK_VALIDATION_MESSAGE = "Revise os campos destacados para continuar.";
const FALLBACK_ERROR_MESSAGE = "Não foi possível concluir. Tente novamente.";

function findFirstMessage(value: unknown): string | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  if ("message" in value && typeof value.message === "string" && value.message) {
    return value.message;
  }

  for (const child of Object.values(value)) {
    const message = findFirstMessage(child);
    if (message) return message;
  }

  return null;
}

export function getFirstFormErrorMessage<TFieldValues extends FieldValues>(errors: FieldErrors<TFieldValues>) {
  return findFirstMessage(errors) ?? FALLBACK_VALIDATION_MESSAGE;
}

export function notifyFormErrors<TFieldValues extends FieldValues>(errors: FieldErrors<TFieldValues>) {
  toast.error(getFirstFormErrorMessage(errors), {
    description: "Corrija a informacao e tente novamente.",
  });
}

export function notifyValidationMessage(message = FALLBACK_VALIDATION_MESSAGE) {
  toast.error(message, {
    description: "Corrija a informacao e tente novamente.",
  });
}

export function notifyAppError(error: unknown, fallback = FALLBACK_ERROR_MESSAGE) {
  toast.error(error instanceof Error ? error.message : fallback);
}
