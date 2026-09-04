"use client";

import { useState } from "react";
import type { ServiceProvider } from "@/types/waitlist";
import { Sidebar } from "@/components/waitlist/Sidebar";
import { FilterChips } from "@/components/waitlist/FilterChips";
import { SearchBar } from "@/components/waitlist/SearchBar";
import { ServiceProvidersTable } from "@/components/waitlist/ServiceProvidersTable";
import { Pagination } from "@/components/waitlist/Pagination";
import { ActionModal } from "@/components/waitlist/ActionModal";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { MenuIcon } from "@/components/icons";
import {
  SERVICE_PROVIDERS,
} from "@/data/service-providers";
import { useServiceProviders } from "@/hooks/useServiceProviders";

function WaitlistDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const { showToast } = useToast();

  const {
    rows,
    totalPages,
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
    handlePageChange,
    hasActiveFilters,
  } = useServiceProviders({ initialProviders: SERVICE_PROVIDERS });

  const handleApplyFilters = (filtersToApply: typeof filters) => {
    applyFilters(filtersToApply);
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
    showToast("Filters applied");
  };

  const handleClearFilters = () => {
    if (!hasActiveFilters) return;
    clearFilters();
    showToast("Filters cleared");
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 px-6 py-10 lg:mx-auto lg:max-w-[1436px] lg:flex-row">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <main className="min-w-0 flex-1 ">
        <div className="flex w-full max-w-[1076px] flex-col gap-6">
          <div className="flex items-center gap-3 sm:gap-0">
            <button
              className="mr-2 text-ink lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
            <h1 className="text-[36px] font-normal leading-[44px] text-[#12153A]">Waitlist</h1>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <FilterChips />
            <div className="w-full max-w-[264px]">
              <SearchBar value={search} onChange={handleSearch} />
            </div>
          </div>

          <div>
            <ServiceProvidersTable
              rows={rows}
              onSort={handleSort}
              sort={sort}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              onSelectAll={toggleSelectAll}
              allSelected={allSelected}
              someSelected={someSelected}
              onEdit={(row) => setSelectedProvider(row)}
            />
          </div>

          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          
          </div>
        </div>
      </main>

      <ActionModal
        key={selectedProvider?.id ?? "none"}
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <ToastProvider>
      <WaitlistDashboard />
    </ToastProvider>
  );
}

