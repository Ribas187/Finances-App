import { cn } from "@turbostack/utils";
import { Star } from "lucide-react";

export function Rating({ value, className }: { value: number, className?: string }) {
  return (
    <div className={cn("flex items-center -ml-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="relative">
          <StarIcon className="w-6 h-6 text-muted-foreground/20" />
          <StarIconFill
            className="w-6 h-6 text-yellow-500 absolute z-index-0 top-0 left-0"
            fillPercentage={Math.max(0, Math.min(100, (value - star + 1) * 100))}
          />
        </span>
      ))}
    </div>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function StarIconFill({ fillPercentage, ...props }: React.SVGProps<SVGSVGElement> & { fillPercentage: number }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <defs>
        <clipPath id={`clip-${fillPercentage}`}>
          <rect x="0" y="0" width={`${fillPercentage}%`} height="100%" />
        </clipPath>
      </defs>
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        clipPath={`url(#clip-${fillPercentage})`}
      />
    </svg>
  )
}