"use client";

import type {
  ServiceProvider,
  SortableColumn,
  SortState,
} from "@/types/waitlist";
import { EditIcon } from "@/components/icons";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

type ServiceProvidersTableProps = {
  rows: ServiceProvider[];
  onSort: (column: SortableColumn) => void;
  sort: SortState | null;
  selectedIds: ReadonlySet<number>;
  onToggleSelect: (id: number) => void;
  onSelectAll: () => void;
  allSelected: boolean;
  someSelected: boolean;
  onEdit: (row: ServiceProvider) => void;
};

const CHECKBOX_WIDTH = 51;
const DATA_COLUMN_WIDTH = 135.14;
const ACTIONS_WIDTH = 79;
const COLUMN_WIDTHS: Record<string, number> = {
  Email: DATA_COLUMN_WIDTH,
  "Phone Number": DATA_COLUMN_WIDTH,
  Postcode: DATA_COLUMN_WIDTH,
  "Vendor Type": DATA_COLUMN_WIDTH,
  "Service Offering": DATA_COLUMN_WIDTH,
  "Signup Date": DATA_COLUMN_WIDTH,
  Status: DATA_COLUMN_WIDTH,
  Actions: ACTIONS_WIDTH,
};

type Column = {
  key: SortableColumn;
  label: string;
};

const SORTABLE_COLUMNS: Column[] = [
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone Number" },
  { key: "postcode", label: "Postcode" },
  { key: "vendorType", label: "Vendor Type" },
  { key: "serviceOffering", label: "Service Offering" },
  { key: "signupDate", label: "Signup Date" },
  { key: "status", label: "Status" },
];

export function ServiceProvidersTable({
  rows,
  onSort,
  sort,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  allSelected,
  someSelected,
  onEdit,
}: ServiceProvidersTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-[8px] border border-[#677582]">
      <table className="w-full min-w-[1076px] overflow-hidden rounded-[8px] border-collapse bg-white [table-layout:fixed]">
        <colgroup>
          <col style={{ width: CHECKBOX_WIDTH }} />
          {SORTABLE_COLUMNS.map((column) => (
            <col key={column.key} style={{ width: COLUMN_WIDTHS[column.label] }} />
          ))}
          <col style={{ width: ACTIONS_WIDTH }} />
        </colgroup>
        <thead>
          <tr className="bg-neutral-950">
            <th className="flex h-[88px] items-center justify-between border-b border-neutral-700 p-4 align-middle">
              <div className="flex h-[24px] w-[24px] items-center">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={onSelectAll}
                  ariaLabel="Select all rows"
                />
              </div>
            </th>
            {SORTABLE_COLUMNS.map((column) => (
              <th
                key={column.key}
                className="h-[88px] border-b border-neutral-700 p-4 align-middle text-left text-[17px] font-bold leading-6 tracking-[0.15px] text-neutral-200"
              >
                <div className="flex w-full items-center justify-start gap-4">
                  <button
                    onClick={() => onSort(column.key)}
                    aria-label={`Sort by ${column.label}`}
                    className="flex items-center gap-1 min-w-0 break-words text-left transition-colors hover:text-primary focus:outline-none"
                  >
                    {column.label}
                    {sort?.column === column.key ? (
                      sort.direction === "asc" ? (
                        <ArrowUp className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5 shrink-0" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3.5 w-3.5 shrink-0 opacity-40" />
                    )}
                  </button>
                </div>
              </th>
            ))}
            <th className="h-[88px] border-b border-neutral-700 p-4 align-middle text-left text-[17px] font-bold leading-6 tracking-[0.15px] text-neutral-200">
              <div className="flex w-full items-center justify-start gap-4">
                <span className="min-w-0 break-words">Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className={`transition-colors hover:bg-neutral-100/60 ${index % 2 === 0 ? "bg-white" : "bg-[#EAEEF3]"}`}>
              <td className="h-[86px] px-3.5 align-middle">
                <Checkbox
                  checked={selectedIds.has(row.id)}
                  onChange={() => onToggleSelect(row.id)}
                  ariaLabel={`Select ${row.email}`}
                />
              </td>
              <td className="h-[86px] px-4 align-middle">
                <CellText>{row.email}</CellText>
              </td>
              <td className="h-[86px] px-4 align-middle">
                <CellText>{row.phone}</CellText>
              </td>
              <td className="h-[86px] px-4 align-middle">
                <CellText>{row.postcode}</CellText>
              </td>
              <td className="h-[86px] px-4 align-middle">
                <CellText>{row.vendorType}</CellText>
              </td>
              <td className="h-[86px] px-4 align-middle">
                <CellText>{row.serviceOffering}</CellText>
              </td>
              <td className="h-[86px] px-4 align-middle">
                <CellText>{row.signupDate}</CellText>
              </td>
              <td className="h-[86px] px-4 align-middle">
                <CellText>{row.status}</CellText>
              </td>
              <td className="h-[86px] px-4 align-middle">
                <TableActions row={row} onEdit={onEdit} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  ariaLabel: string;
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      ref={(node) => {
        if (node) node.indeterminate = indeterminate;
      }}
      onChange={onChange}
      aria-label={ariaLabel}
      className="h-[24px] w-[24px] cursor-pointer rounded-[4px] border-neutral-100 accent-[#4680ff]"
    />
  );
}

function TableActions({
  row,
  onEdit,
}: {
  row: ServiceProvider;
  onEdit: (row: ServiceProvider) => void;
}) {
  return (
    <div className="flex items-center justify-center text-neutral-500">
      <button
        onClick={() => onEdit(row)}
        className="p-1 transition-colors hover:text-primary"
        aria-label={`Edit ${row.email}`}
      >
        <EditIcon />
      </button>
    </div>
  );
}

function CellText({ children }: { children: React.ReactNode }) {
  return (
    <span className="block break-words text-[14px] leading-5 tracking-[0.25px] text-neutral-200">
      {children}
    </span>
  );
}
