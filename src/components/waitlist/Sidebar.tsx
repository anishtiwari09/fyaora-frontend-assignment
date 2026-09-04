"use client";

import type { FilterState } from "@/types/waitlist";
import { SidebarFilters } from "@/components/waitlist/SidebarFilters";
import { CloseIcon } from "@/components/icons";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onClear: () => void;
};

export function Sidebar({ open, onClose, filters, onApply, onClear }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[288px] shrink-0 flex-col justify-between bg-neutral-950 p-4 transition-transform duration-300 ease-in-out lg:static lg:h-full lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between gap-[46.41px] overflow-y-auto">
          <div className="flex w-full items-center justify-between gap-6">
            <div className="flex h-[38px] items-end">
              <Logo />
              <span className="flex h-[19px] w-[103px] items-center text-[16px] font-medium leading-[19px] tracking-[0.3%] text-[#1A78F2]">
                Admin Panel
              </span>
            </div>
            <button
              className="text-neutral-500 lg:hidden"
              onClick={onClose}
              aria-label="Close menu"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <button className="flex h-9 w-full items-center justify-center gap-[10px] rounded-lg bg-neutral-800 px-4 py-2 text-[16px] font-bold leading-5 text-black">
            User Management
          </button>

          <div>
            <SidebarFilters value={filters} onApply={onApply} onClear={onClear} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/waitlist-logo.png"
      alt="ServiceHub logo"
      className="h-[38px] w-[48px]"
    />
  );
}
