'use client';

import { cn } from '@turbostack/utils';

import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <svg className={cn("h-10 w-10 text-primary", className)} viewBox="0 0 533 533" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M237.851 12.2841C253.472 -3.33688 278.799 -3.33689 294.42 12.2841L348.867 66.7313L156.534 259.064L73.8024 176.333L237.851 12.2841Z" fill="currentColor" />
        <path d="M12.2841 294.42C-3.33688 278.799 -3.33688 253.472 12.2841 237.851L66.7313 183.404L259.771 376.444L177.04 459.176L12.2841 294.42Z" fill="currentColor" />
        <path d="M376.444 273.914L459.176 356.645L295.127 520.694C279.506 536.315 254.179 536.315 238.558 520.694L184.111 466.247L376.444 273.914Z" fill="currentColor" />
        <path d="M273.206 156.534L355.938 73.8024L520.694 238.558C536.315 254.179 536.315 279.506 520.694 295.127L466.247 349.574L273.206 156.534Z" fill="currentColor" />
      </svg>
    </Link>
  )
}