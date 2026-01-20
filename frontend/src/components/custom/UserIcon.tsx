import { useAuthStore } from '@/stores/auth'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface UserIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'lg'
  className?: string
}

export function UserIcon({ size = 'sm', className, ...props }: UserIconProps) {
  const { user } = useAuthStore()

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ')
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase()
    }
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  const initials = user?.name ? getInitials(user.name) : '??'

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gray-200 font-bold text-gray-700',
        size === 'sm' ? 'h-9 w-9 text-sm' : 'h-16 w-16 text-2xl',
        className
      )}
      {...props}
    >
      {initials}
    </div>
  )
}
