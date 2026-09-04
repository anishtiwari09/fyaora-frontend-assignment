import type { ServiceProvider } from "@/types/waitlist";
import seeds from "./seed-data.json"
type Seed = {
  email: string;
  phone: string;
  postcode: string;
  vendorType: ServiceProvider["vendorType"];
  serviceOffering: ServiceProvider["serviceOffering"];
};

const SEEDS = seeds as Seed[]

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function toIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

type ServiceProviderRecord = ServiceProvider & { isoDate: string };

function buildDataset(): ServiceProviderRecord[] {
  const start = new Date(2026, 2, 1);
  return SEEDS.map((seed, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const status: ServiceProvider["status"] =
      index % 3 === 0 ? "Rejected" : "Onboarded";
    return {
      id: index + 1,
      email: seed.email,
      phone: seed.phone,
      postcode: seed.postcode,
      vendorType: seed.vendorType,
      serviceOffering: seed.serviceOffering,
      signupDate: formatDate(date),
      status,
      isoDate: toIso(date),
    };
  });
}

export const SERVICE_PROVIDERS: ServiceProvider[] = buildDataset();

export const ISO_BY_ID = new Map<number, string>(
  buildDataset().map((row) => [row.id, row.isoDate])
);

export function getIsoDate(id: number): string {
  return ISO_BY_ID.get(id) ?? "";
}
