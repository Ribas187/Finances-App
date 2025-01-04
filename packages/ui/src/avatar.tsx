import { cn, AVATAR_DICEBEAR_URL } from "@turbostack/utils"

type AvatarProps = {
  image?: string | null,
  className?: string;
  fallback?: string | null;
}

export function Avatar({ fallback, image, className }: AvatarProps) {
  if (!image) {
    return <AvatarFallback fallback={fallback} className={className} />
  }

  return (
    <img
      referrerPolicy="no-referrer"
      src={image}
      className={cn("h-10 w-10 rounded-full", className)}
      draggable={false}
    />
  )
}

function AvatarFallback({ fallback, className }: { fallback?: string | null, className?: string; }) {
  return (
    <img
      alt={`Avatar for ${fallback}`}
      referrerPolicy="no-referrer"
      src={`${AVATAR_DICEBEAR_URL}${fallback}`}
      className={cn(
        "border h-10 w-10 rounded-full text-primary-foreground flex items-center justify-center text-xl",
        className
      )}></img>
  )
}