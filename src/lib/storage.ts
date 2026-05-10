export function readStorage<TValue>(key: string, fallback: TValue): TValue {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as TValue) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<TValue>(key: string, value: TValue) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(key);
}
