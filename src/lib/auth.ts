import type { AuthResponse, SignInPayload, SignUpPayload } from "@/types/auth";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";

const MOCK_DELAY = 700;
const AUTH_KEY = "ignite-gym-auth";

function wait(delay = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function createAuthResponse(name: string, email: string): AuthResponse {
  return {
    token: "mock-token",
    user: {
      id: "user-1",
      name,
      email,
    },
  };
}

export async function signIn(payload: SignInPayload) {
  await wait();

  if (payload.email === "erro@gymflow.com") {
    throw new Error("E-mail ou senha invalidos.");
  }

  const response = createAuthResponse("Rodrigo Goncalves", payload.email);
  writeStorage(AUTH_KEY, response);
  return response;
}

export async function signUp(payload: SignUpPayload) {
  await wait();

  if (payload.email === "erro@gymflow.com") {
    throw new Error("Este e-mail ja esta em uso.");
  }

  const response = createAuthResponse(payload.name, payload.email);
  writeStorage(AUTH_KEY, response);
  return response;
}

export async function signOut() {
  await wait(300);
  removeStorage(AUTH_KEY);
}

export function getAuthSession() {
  return readStorage<AuthResponse | null>(AUTH_KEY, null);
}
