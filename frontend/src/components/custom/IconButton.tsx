import { Button } from '@/components/ui/button'
import { forwardRef } from 'react'

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <Button variant="outline" size="icon" ref={ref} className={className} {...props}>
        {icon}
      </Button>
    )
  }
)

IconButton.displayName = 'IconButton'

export { IconButton }
