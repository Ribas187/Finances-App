import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delayInMs: number): { value: T } {
  const [debouncedState, setDebouncedState] = useState<{ value: T }>({
    value
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedState(() => ({ value }));
    }, delayInMs)

    return () => {
      clearTimeout(timeout);
    }
  }, [value, delayInMs]);

  return debouncedState;
}