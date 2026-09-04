"use client";

import { useState } from "react";
import type {
  FilterState,
  RegistrationStatus,
  ServiceOffering,
  VendorType,
} from "@/types/waitlist";
import { isDateRangeValid } from "@/utils/dates";
import { DateField } from "@/components/ui/date-field";

type SidebarFiltersProps = {
  value: FilterState;
  onApply: (filters: FilterState) => void;
  onClear: () => void;
};

const EMPTY_FILTERS: FilterState = {
  postcode: "",
  statuses: [],
  startDate: "",
  endDate: "",
  vendorTypes: [],
  serviceOfferings: [],
};

const STATUS_OPTIONS: RegistrationStatus[] = ["Onboarded", "Rejected"];
const VENDOR_OPTIONS: VendorType[] = ["Independent", "Company"];
const SERVICE_OPTIONS: ServiceOffering[] = [
  "Housekeeping",
  "Window Cleaning",
  "Car Valet",
];

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((v) => v !== item) : [...list, item];
}

export function SidebarFilters({ value, onApply, onClear }: SidebarFiltersProps) {
  const [draft, setDraft] = useState<FilterState>(value);
  const [dateError, setDateError] = useState<string | null>(null);

  const update = <K extends keyof FilterState>(key: K, val: FilterState[K]) => {
    setDraft((prev) => ({ ...prev, [key]: val }));
  };

  const handleApply = () => {
    if (!isDateRangeValid(draft.startDate, draft.endDate)) {
      setDateError("Enter a valid MM/DD/YYYY date range (start must be on or before end).");
      return;
    }
    setDateError(null);
    onApply({
      ...draft,
      postcode: draft.postcode.trim(),
    });
  };

  const handleClear = () => {
    setDraft(EMPTY_FILTERS);
    setDateError(null);
    onClear();
  };

  return (
    <div className="flex flex-col gap-[46.41px]">
      <Section title="Postcode">
        <FilterInput
          value={draft.postcode}
          onChange={(v) => update("postcode", v)}
          placeholder="ZIP"
          inputClassName="!w-[125px] !px-2.5 !rounded-t-[4px] !text-[16px] !placeholder:font-bold"
        />
      </Section>

      <Section title="Registration Status">
        <CheckboxGroup
          options={STATUS_OPTIONS}
          selected={draft.statuses}
          onToggle={(v) => update("statuses", toggle(draft.statuses, v))}
        />
      </Section>

      <Section title="Date Registered">
        <div className="flex gap-1">
          <div className="min-w-0 flex-1">
            <DateField
              label="Start"
              value={draft.startDate}
              onChange={(iso) => {
                setDateError(null);
                update("startDate", iso);
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <DateField
              label="End"
              value={draft.endDate}
              onChange={(iso) => {
                setDateError(null);
                update("endDate", iso);
              }}
            />
          </div>
        </div>
        {dateError && (
          <p role="alert" className="mt-2 w-56 text-[12px] leading-4 text-red-600">
            {dateError}
          </p>
        )}
      </Section>

      <Section title="Vendor Type">
        <CheckboxGroup
          options={VENDOR_OPTIONS}
          selected={draft.vendorTypes}
          onToggle={(v) => update("vendorTypes", toggle(draft.vendorTypes, v))}
        />
      </Section>

      <Section title="Service Offering">
        <CheckboxGroup
          options={SERVICE_OPTIONS}
          selected={draft.serviceOfferings}
          onToggle={(v) => update("serviceOfferings", toggle(draft.serviceOfferings, v))}
        />
      </Section>

      <div className="mt-8 flex flex-row items-center justify-center gap-3">
        <button
          onClick={handleApply}
          className="flex h-[56px] w-[107px] items-center justify-center whitespace-nowrap rounded-[100px] border-2 border-[#1a78f2] bg-[#1a78f2] px-[12px] py-[16px] text-center text-[20px] font-medium leading-none tracking-[0.5px] text-white transition-opacity hover:opacity-90"
        >
          Filters
        </button>
        <button
          onClick={handleClear}
          className="flex h-[56px] w-[107px] items-center justify-center whitespace-nowrap rounded-[100px] border-2 border-[#1a78f2] bg-white px-[12px] py-[16px] text-center text-[20px] font-medium leading-none tracking-[0.5px] text-[#1a78f2] transition-colors hover:bg-[#1a78f2]/10"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  headerClassName,
}: {
  title: string;
  children: React.ReactNode;
  headerClassName?: string;
}) {
  return (
    <section className="flex w-full flex-col gap-[4px]">
      <h3
        className={`flex h-[38px] w-full items-center border-t border-black/10 px-3 text-[16px] font-bold leading-5 text-[#324054] ${headerClassName ?? ""}`}
      >
        {title}
      </h3>
      <div className="w-full min-w-0 px-0">{children}</div>
    </section>
  );
}

function CheckboxGroup<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: readonly T[];
  selected: readonly T[];
  onToggle: (value: T) => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {options.map((option) => {
        const checked = selected.includes(option);
        return (
          <li key={option}>
            <label className="relative flex h-[38px] w-full cursor-pointer items-center gap-3 rounded-md px-3 transition-colors hover:bg-neutral-950">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="peer h-[22px] w-[22px] shrink-0 appearance-none rounded-[6px] border border-neutral-800 bg-white checked:border-[#4680ff] checked:bg-[#4680ff]"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 22 22"
                className="pointer-events-none absolute left-3 hidden h-[22px] w-[22px] text-white peer-checked:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 11.5l3.5 3.5L16 8" />
              </svg>
              <span className="text-[14px] leading-5 text-ink">{option}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function FilterInput({
  value,
  onChange,
  placeholder,
  trailingIcon,
  inputClassName,
  wrapperClassName,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  trailingIcon?: React.ReactNode;
  inputClassName?: string;
  wrapperClassName?: string;
  type?: string;
}) {
  return (
    <div className={`relative flex h-[38px] items-center ${wrapperClassName ?? ""}`}>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`h-[38px] w-full rounded-md border border-neutral-800 bg-white pl-3 pr-9 font-medium text-[16px] leading-5 text-ink placeholder:text-neutral-500 focus:border-primary focus:outline-none ${inputClassName ?? ""}`}
      />
      {trailingIcon && (
        <span className="pointer-events-none absolute right-3 text-neutral-500">
          {trailingIcon}
        </span>
      )}
    </div>
  );
}
