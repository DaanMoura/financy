import { cn } from '@/lib/utils'
import * as React from 'react'

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Tag({ children, className, color, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-sm font-medium',
        `bg-${color}-light`,
        `text-${color}-base`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
