'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { subDays } from 'date-fns';
import { DateRangePicker } from '@turbostack/ui';
import { usePeriod } from '@/lib/hook/use-period';

export function PeriodSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { start, end } = usePeriod(searchParams, {
    start: subDays(new Date(), 30),
    end: new Date()
  });

  return (
    <DateRangePicker
      value={start && end ? {
        from: start,
        to: end
      } : undefined}
      onChange={(range => {
        if (!range || !range.from || !range.to) return;

        const newParams = new URLSearchParams(searchParams);
        newParams.set('start', range.from.toISOString())
        newParams.set('end', range.to.toISOString())
        const queryString = newParams.toString();

        const newPath = `${pathname}${queryString.length > 0 ? `?${queryString}` : ''}`
        router.push(newPath);
      })}
    />
  )
}