"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 0) return null;

  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goTo = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center gap-2" aria-label="Pagination">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] border border-border-strong bg-white p-[10px] text-ink transition-colors hover:bg-neutral-950 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        aria-label="Previous page"
      >
        <ArrowLeftIcon className="h-3 w-3 text-ink" />
      </button>

      {pageNums.map((page) => (
        <button
          key={page}
          onClick={() => goTo(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`flex h-[30px] w-[32px] items-center justify-center rounded-[4px] border px-[7px] text-[14px] leading-[22px] transition-colors ${
            currentPage === page
              ? "border-primary bg-white font-medium text-primary"
              : "border-border-default bg-white font-normal text-ink hover:bg-neutral-950"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] border border-border-strong bg-white text-ink transition-colors hover:bg-neutral-950 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        aria-label="Next page"
      >
        <ArrowRightIcon className="h-3 w-3 text-ink" />
      </button>
    </div>
  );
}
