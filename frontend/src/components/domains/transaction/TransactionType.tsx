import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TransactionType } from '@/types'

type TransactionTypeIndicatorProps = {
  type: TransactionType
  iconOnly?: boolean
}

const TransactionTypeIndicator = ({ type, iconOnly }: TransactionTypeIndicatorProps) => {
  return (
    <div className="flex items-center gap-2">
      {type === TransactionType.INCOME ? (
        <CircleArrowUp className="size-4 text-brand-base" />
      ) : (
        <CircleArrowDown className="size-4 text-red-base" />
      )}

      {!iconOnly && (
        <span
          className={cn(
            'text-sm font-medium',
            type === TransactionType.INCOME ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          {type === TransactionType.INCOME ? 'Entrada' : 'Saída'}
        </span>
      )}
    </div>
  )
}

export { TransactionTypeIndicator }
