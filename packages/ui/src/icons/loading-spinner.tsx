import { cn } from "@turbostack/utils";
import { Loader2 } from "lucide-react";

export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={cn('h-10 w-10 animate-spin', className)} />
}
