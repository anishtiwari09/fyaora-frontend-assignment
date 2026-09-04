import { parse, format, parseISO, isValid, isAfter } from "date-fns";

export function parseDate(value: string): Date | null {
  if (!value) return null;
  const date = parse(value.trim(), "dd/MM/yyyy", new Date());
  return isValid(date) ? date : null;
}

export function toIso(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function parseIsoDate(value: string): Date | null {
  if (!value) return null;
  const date = parseISO(value.trim());
  return isValid(date) ? date : null;
}

export function isDateRangeValid(startDate: string, endDate: string): boolean {
  if (!startDate && !endDate) return true;
  const start = parseIsoDate(startDate);
  const end = parseIsoDate(endDate);
  if (startDate && !start) return false;
  if (endDate && !end) return false;
  if (start && end && isAfter(start, end)) return false;
  return true;
}
