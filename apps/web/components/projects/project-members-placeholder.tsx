import { Skeleton } from "@turbostack/ui";

export function ProjectMembersPlaceholder() {
  return <>{Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="flex items-center justify-between space-x-3">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-1 h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-3 w-24" />
    </div>
  ))}</>
}