'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { CalendarIcon } from "lucide-react"
import { format, addDays } from "date-fns";
import { DateRange } from 'react-day-picker';
import { cn } from "@turbostack/utils";

import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Button } from './button';
import { Calendar } from './calendar';

export type Period = {
  from: Date,
  to: Date
}

export function DateRangePicker({ value, className, onChange }: { 
  value?: DateRange,
  className?: string, 
  onChange?: (date: DateRange | undefined) => void 
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: value?.from,
    to: value?.to,
  })

  useEffect(() => {
    onChange && onChange(date);
  }, [date]);
 
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}