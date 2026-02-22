import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-brand-base text-neutral-white hover:bg-brand-dark disabled:bg-brand-base/50 disabled:text-neutral-white/50',
        outline:
          'border border-gray-300 bg-neutral-white hover:bg-accent text-gray-700 hover:bg-gray-200 disabled:border-gray-300/50 disabled:bg-neutral-white disabled:text-gray-300/50',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        md: 'h-12 px-4 py-3',
        sm: 'h-9 px-3 py-2',
        icon: 'h-8 p-2 w-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

function Button({
  className,
  variant = 'default',
  size = 'md',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }), 'h')}
      {...props}
    />
  )
}

export { Button, buttonVariants }
