import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SWRError extends Error {
  status: number;
}

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const error = await response.text();
    const err = new Error(error) as SWRError;
    err.status = response.status;
    throw err;
  }

  return response.json();
}

export function getSearchParams(url: string) {
  const params = {} as Record<string, string>;
  
  new URL(url).searchParams.forEach((key, value) => {
    params[key] = value;
  });
  
  return params;
}