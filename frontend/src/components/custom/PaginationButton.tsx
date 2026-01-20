import { Button } from '@/components/ui/button'
import { forwardRef } from 'react'

interface PaginationButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ isActive, className, children, ...props }, ref) => {
    return (
      <Button
        variant={isActive ? 'default' : 'outline'}
        size="icon"
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

PaginationButton.displayName = 'PaginationButton'

export { PaginationButton }
