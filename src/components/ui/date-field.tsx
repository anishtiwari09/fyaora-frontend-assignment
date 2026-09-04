"use client";

import * as React from "react";
import { CalendarIcon } from "@/components/icons";

interface DateFieldProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function DateField({
  label = "",
  value = "",
  onChange,
}: DateFieldProps) {
  const hiddenRef = React.useRef<HTMLInputElement>(null);

  const openPicker = () => {
    hiddenRef.current?.showPicker?.();
  };

  return (
    <div className="relative w-full">
      {/* Floating label */}
      <span
        className="
          absolute
          left-4
          top-0
          z-10
          -translate-y-1/2
          h-4
          w-[38px]
          bg-white
          px-1
          text-[12px]
          font-normal
          leading-4
          tracking-[0.4px]
          text-[#0066FF]
        "
      >
        Date
      </span>

      {/* Date field */}
      <button
        type="button"
        onClick={openPicker}
        className="
          flex
          h-[56px]
          w-full
          cursor-pointer
          items-center
          justify-between
          rounded-t-[4px]
          border
          border-[3px]
          border-[#1A78F2]
          bg-white
          pr-2
          pl-4
          text-left
          transition-colors
          focus:outline-none
        "
      >
        <span
          className={`truncate ${value ? "text-[11px] leading-4 tracking-[0.5px]" : "text-[16px] leading-6 tracking-[0.5px]"} font-normal text-[#1C1B1B]`}
        >
          {value ? formatDate(value) : label}
        </span>
        <span
          className={`flex ${value ? "h-5 w-5" : "h-10 w-10"} shrink-0 items-center justify-center rounded-full bg-neutral-100`}
        >
          <CalendarIcon className={`${value ? "h-3 w-3" : "h-4 w-4"} text-neutral-600`} />
        </span>
      </button>

      {/* Hidden native date picker */}
      <input
        type="date"
        aria-hidden="true"
        tabIndex={-1}
        ref={hiddenRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      {/* Date format */}
      <div className="mt-3 px-1 text-[12px] font-normal leading-4 tracking-[0.4px] text-[#4E4636]">
        MM/DD/YYYY
      </div>
    </div>
  );
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");

  return `${month}/${day}/${year}`;
}
