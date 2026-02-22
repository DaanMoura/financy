import { getCategoryColor } from '@/utils/categoryColors'
import type { CategoryColorName } from '@/types'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  children: React.ReactNode
  color?: CategoryColorName | null
  className?: string
}

export function Tag({ children, className, color, ...props }: TagProps) {
  const colors = getCategoryColor(color)
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-sm font-medium',
        colors.bgLight,
        colors.text,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
