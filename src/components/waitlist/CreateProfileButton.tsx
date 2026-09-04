"use client";

import { ChevronDownIcon } from "@/components/icons";

export function CreateProfileButton() {
  return (
    <button className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2 text-[14px] font-medium leading-[22px] text-white shadow-[0_2px_0_0_rgba(0,0,0,0.02)] transition-colors hover:bg-primary/90 md:inline-flex">
      Create Profile
      <ChevronDownIcon className="text-white" />
    </button>
  );
}
