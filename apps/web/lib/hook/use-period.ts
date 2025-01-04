import { useMemo } from 'react';
import { startOfDay, subDays, endOfDay } from 'date-fns'

export function usePeriod(searchParams, defaults?: { start: Date, end: Date }) {
  const { start, end } = useMemo(() => {
    const hasRange = searchParams?.has("start") && searchParams?.has("end");

    return {
      start: hasRange
        ? startOfDay(
          new Date(searchParams?.get("start") || subDays(new Date(), 1)),
        )
        : defaults?.start ?? undefined,

      end: hasRange
        ? endOfDay(new Date(searchParams?.get("end") || new Date()))
        : defaults?.end ?? undefined,
    };
  }, [searchParams?.get("start"), searchParams?.get("end")]);

  return { start, end }
}