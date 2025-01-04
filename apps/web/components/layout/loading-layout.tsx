import { LoadingSpinner } from '@turbostack/ui';

export function LoadingLayout() {
  return (
    <div className="flex h-[calc(100vh-16px)] items-center justify-center">
      <LoadingSpinner className="h-16 w-16 text-primary" />
    </div>
  )
}