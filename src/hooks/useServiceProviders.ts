"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  FilterState,
  ServiceProvider,
  SortState,
  SortableColumn,
} from "@/types/waitlist";
import { filterProviders, sortProviders } from "@/utils/waitlist";

export const PAGE_SIZE = 10;

type UseServiceProvidersOptions = {
  initialProviders: ServiceProvider[];
};

export function useServiceProviders({ initialProviders }: UseServiceProvidersOptions) {
  const [providers, setProviders] = useState<ServiceProvider[]>(initialProviders);
  const [filters, setFilters] = useState<FilterState>({
    postcode: "",
    statuses: [],
    startDate: "",
    endDate: "",
    vendorTypes: [],
    serviceOfferings: [],
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortState | null>(null);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const filtered = useMemo(
    () => filterProviders(providers, filters, search),
    [providers, filters, search]
  );

  const sorted = useMemo(() => sortProviders(filtered, sort), [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const totalCount = sorted.length;

  const currentPage = Math.min(page, totalPages);

  const rows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, currentPage]);

  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id));
  const someSelected =
    rows.some((row) => selectedIds.has(row.id)) && !allSelected;

  const applyFilters = useCallback(
    (filtersToApply: FilterState) => {
      setFilters(filtersToApply);
      setPage(1);
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
      postcode: "",
      statuses: [],
      startDate: "",
      endDate: "",
      vendorTypes: [],
      serviceOfferings: [],
    });
    setSearch("");
    setPage(1);
    setSort(null);
  }, []);

  const handleSort = useCallback((column: SortableColumn) => {
    setSort((prev) => {
      if (prev?.column === column) {
        return prev.direction === "asc"
          ? { column, direction: "desc" }
          : { column, direction: "asc" };
      }
      return { column, direction: "asc" };
    });
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const toggleSelect = useCallback(
    (id: number) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    []
  );

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        rows.forEach((row) => next.delete(row.id));
      } else {
        rows.forEach((row) => next.add(row.id));
      }
      return next;
    });
  }, [allSelected, rows]);

  const updateProvider = useCallback((id: number, updates: Partial<ServiceProvider>) => {
    setProviders((prev) =>
      prev.map((provider) => (provider.id === id ? { ...provider, ...updates } : provider))
    );
  }, []);

  return {
    providers,
    rows,
    totalPages,
    totalCount,
    currentPage,
    filters,
    applyFilters,
    clearFilters,
    search,
    handleSearch,
    sort,
    handleSort,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    allSelected,
    someSelected,
    updateProvider,
    handlePageChange,
    hasActiveFilters: filters.postcode !== "" ||
      filters.statuses.length > 0 ||
      filters.startDate !== "" ||
      filters.endDate !== "" ||
      filters.vendorTypes.length > 0 ||
      filters.serviceOfferings.length > 0 ||
      search.trim() !== "",
  };
}
