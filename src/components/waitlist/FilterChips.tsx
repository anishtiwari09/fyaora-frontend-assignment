"use client";

import { useState } from "react";
import chips from "@/data/filter-chips.json";

export function FilterChips() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-[32px] items-center gap-4">
      {chips.map((chip, i) => (
        <button
          key={chip.label}
          onClick={() => setActive(i)}
          className={`flex h-[32px] items-center justify-center pl-2 pr-3 text-[14px] font-medium leading-5 tracking-[0.1px] transition-colors ${
            active === i
              ? "rounded-lg bg-gumbo-200 text-gumbo-900"
              : "rounded-lg border border-[#807664] bg-transparent text-gumbo-900"
          }`}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
