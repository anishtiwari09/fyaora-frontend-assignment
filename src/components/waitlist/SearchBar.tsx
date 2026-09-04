"use client";

import { SearchIcon } from "@/components/icons";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = "Search User" }: SearchBarProps) {
  return (
    <div className="flex h-[32px] w-full items-stretch overflow-clip rounded-[2px] border border-neutral-800 bg-white focus-within:border-primary">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="min-w-0 flex-1 bg-transparent px-3 text-[14px] leading-[22px] text-ink placeholder:text-neutral-500 focus:outline-none"
      />
      <div className="flex items-center border-l border-neutral-100 px-[9px] text-neutral-500">
        <SearchIcon className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}
