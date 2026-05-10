import type { OnboardingProfile } from "@/types/onboarding";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";

const DRAFT_KEY = "ignite-gym-onboarding-draft";
const PROFILE_KEY = "ignite-gym-onboarding-profile";

export function getOnboardingDraft() {
  return readStorage<OnboardingProfile>(DRAFT_KEY, {});
}

export function saveOnboardingDraft(profile: OnboardingProfile) {
  writeStorage(DRAFT_KEY, profile);
}

export function clearOnboardingDraft() {
  removeStorage(DRAFT_KEY);
}

export async function saveOnboardingProfile(profile: OnboardingProfile) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  writeStorage(PROFILE_KEY, profile);
  clearOnboardingDraft();
  return { saved: true, profile };
}
