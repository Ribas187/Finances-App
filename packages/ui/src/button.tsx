import React from "react";
import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@turbostack/utils';
import { LoadingSpinner } from "./icons/loading-spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/95',
        accent: 'bg-accent text-accent-foreground hover:bg-muted/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: "hover:bg-accent hover:text-accent-foreground",
        danger: 'bg-danger text-danger-foreground hover:bg-danger/95'
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant, size, loading, className, children, ...props }, ref) =>  {
  return (
    <button
      type={props.onClick ? "button" : "submit"}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={props.disabled || loading}
      ref={ref}
      {...props}
    >
      {loading ? <LoadingSpinner className="h-5 w-5" /> : children}
    </button>
  )
})

Button.displayName = 'Button';