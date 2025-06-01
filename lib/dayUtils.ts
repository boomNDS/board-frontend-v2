import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function timeAgo(date: string | Date): string {
  return dayjs(date).fromNow();
}

export function subtract(
  date: string | Date,
  amount: number,
  unit: dayjs.ManipulateType,
): Date {
  return dayjs(date).subtract(amount, unit).toDate();
}
