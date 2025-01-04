import { cn } from "@turbostack/utils";
import { ReactNode } from "react";

export function FeatureSingle({
  direction = 'ltr',
  title,
  badge,
  children,
  asset
}: {
  direction?: 'ltr' | 'rtl',
  title: string,
  badge: ReactNode,
  children?: ReactNode,
  asset: ReactNode
}) {
  return (
    <div className={
      cn(
        "flex gap-16 p-6 w-full flex-col md:flex-row",
        direction === 'rtl' && "md:flex-row-reverse",
      )
    }>
      <div className="flex flex-col items-start flex-1">
        {badge}
        <h3 className="text-3xl mt-6 leading-tight font-medium">{title}</h3>
        <span className="text-md md:text-lg lg:text-xl text-muted-foreground mt-2 ">
          {children}
        </span>
      </div>
      <div className="flex-1">
        {asset}
      </div>
    </div>
  )
}