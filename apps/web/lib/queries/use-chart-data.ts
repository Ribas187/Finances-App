import { addDays, formatISO } from "date-fns";

export function useChartData(period) {
  const start = new Date(period.start);
  const end = new Date(period.end);
  const data: { date: string, value: number }[] = [];
  let current = start;

  while (current < end) {
    data.push({
      date: formatISO(current),
      value: Math.random() * 100
    });
    current = addDays(current, 1)
  }

  return data;
}