/* ——— CalendarDate — timezone-free date representation ——— */

export interface CalendarDate {
  year: number;
  /** 1-12 */
  month: number;
  /** 1-31 */
  day: number;
}

/* ——— Constants (PT-BR) ——— */

export const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const MONTH_LABELS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

/* ——— Core helpers ——— */

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** 0 = Sunday … 6 = Saturday */
export function firstDayOfWeek(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}

export function prevMonth(d: CalendarDate): CalendarDate {
  return d.month === 1
    ? { year: d.year - 1, month: 12, day: 1 }
    : { year: d.year, month: d.month - 1, day: 1 };
}

export function nextMonth(d: CalendarDate): CalendarDate {
  return d.month === 12
    ? { year: d.year + 1, month: 1, day: 1 }
    : { year: d.year, month: d.month + 1, day: 1 };
}

/* ——— Comparisons ——— */

export function isSameDay(a: CalendarDate, b: CalendarDate): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function today(): CalendarDate {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

export function isToday(d: CalendarDate): boolean {
  return isSameDay(d, today());
}

/** -1 if a < b, 0 if equal, 1 if a > b */
export function compareDates(a: CalendarDate, b: CalendarDate): number {
  if (a.year !== b.year) return a.year < b.year ? -1 : 1;
  if (a.month !== b.month) return a.month < b.month ? -1 : 1;
  if (a.day !== b.day) return a.day < b.day ? -1 : 1;
  return 0;
}

export function isInRange(
  d: CalendarDate,
  start: CalendarDate,
  end: CalendarDate,
): boolean {
  return compareDates(d, start) >= 0 && compareDates(d, end) <= 0;
}

export function isDisabled(
  d: CalendarDate,
  minDate?: CalendarDate,
  maxDate?: CalendarDate,
): boolean {
  if (minDate && compareDates(d, minDate) < 0) return true;
  if (maxDate && compareDates(d, maxDate) > 0) return true;
  return false;
}

/* ——— Formatting / Parsing (DD/MM/AAAA) ——— */

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function formatDate(d: CalendarDate): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;
}

/** Parse DD/MM/AAAA → CalendarDate | null */
export function parseDate(str: string): CalendarDate | null {
  const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  if (!isValidDate(year, month, day)) return null;
  return { year, month, day };
}

export function isValidDate(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > daysInMonth(year, month)) return false;
  if (year < 1900 || year > 2100) return false;
  return true;
}
