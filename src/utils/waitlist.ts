import type {
  FilterState,
  ServiceProvider,
  SortState,
} from "@/types/waitlist";
import { getIsoDate } from "@/data/service-providers";

export function matchesFilters(row: ServiceProvider, filters: FilterState): boolean {
  if (filters.postcode) {
    const needle = filters.postcode.toLowerCase();
    if (!row.postcode.toLowerCase().startsWith(needle)) return false;
  }

  if (filters.statuses.length > 0 && !filters.statuses.includes(row.status)) {
    return false;
  }

  if (filters.vendorTypes.length > 0 && !filters.vendorTypes.includes(row.vendorType)) {
    return false;
  }

  if (
    filters.serviceOfferings.length > 0 &&
    !filters.serviceOfferings.includes(row.serviceOffering)
  ) {
    return false;
  }

  const iso = getIsoDate(row.id);
  if (iso) {
    if (filters.startDate && iso < filters.startDate) return false;
    if (filters.endDate && iso > filters.endDate) return false;
  }

  return true;
}

export function matchesSearch(row: ServiceProvider, search: string): boolean {
  const query = search.trim().toLowerCase();
  if (!query) return true;
  return (
    row.email.toLowerCase().includes(query) ||
    row.postcode.toLowerCase().includes(query) ||
    row.vendorType.toLowerCase().includes(query) ||
    row.serviceOffering.toLowerCase().includes(query) ||
    row.status.toLowerCase().includes(query)
  );
}

export function filterProviders(
  providers: ServiceProvider[],
  filters: FilterState,
  search: string
): ServiceProvider[] {
  const query = search.trim();
  return providers.filter(
    (row) => matchesFilters(row, filters) && matchesSearch(row, query)
  );
}

export function sortProviders(
  providers: ServiceProvider[],
  sort: SortState | null
): ServiceProvider[] {
  if (!sort) return providers;
  const { column, direction } = sort;
  const factor = direction === "asc" ? 1 : -1;

  const sorted = [...providers].sort((a, b) => {
    if (column === "signupDate") {
      const aIso = getIsoDate(a.id);
      const bIso = getIsoDate(b.id);
      return (aIso.localeCompare(bIso) || a.signupDate.localeCompare(b.signupDate)) * factor;
    }
    const aVal = String(a[column]).toLowerCase();
    const bVal = String(b[column]).toLowerCase();
    return aVal.localeCompare(bVal) * factor;
  });

  return sorted;
}
