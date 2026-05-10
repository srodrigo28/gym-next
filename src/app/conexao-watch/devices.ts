export type Device = {
  description: string;
  image: string;
  name: string;
  slug: string;
};

export const devices: Device[] = [
  { description: "Apple Watch e modelos compatíveis com Saúde.", image: "/whatch/apple.webp", name: "Apple Watch", slug: "apple-watch" },
  { description: "Relógios Amazfit e pulseiras Zepp.", image: "/whatch/amazfi.webp", name: "Amazfit", slug: "amazfit" },
  { description: "Garmin Forerunner e dispositivos de corrida.", image: "/whatch/garmin-forerunner.webp", name: "Garmin", slug: "garmin" },
  { description: "Galaxy Watch e wearables Samsung.", image: "/whatch/samsung.webp", name: "Samsung", slug: "samsung" },
  { description: "Smartwatches Xiaomi compatíveis.", image: "/whatch/xiaomi.webp", name: "Xiaomi", slug: "xiaomi" },
  { description: "Pulseiras Redmi Band e modelos parecidos.", image: "/whatch/xiaomi-redmi.webp", name: "Xiaomi Redmi", slug: "xiaomi-redmi" },
];

export function findDeviceBySlug(slug?: string) {
  return devices.find((device) => device.slug === slug) ?? devices[0];
}
