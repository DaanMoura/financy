import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TransactionTypeProps {
  type: 'income' | 'outcome'
}

const TransactionType = ({ type }: TransactionTypeProps) => {
  return (
    <div className="flex items-center gap-2">
      {type === 'income' ? (
        <CircleArrowUp className="size-4 text-brand-base" />
      ) : (
        <CircleArrowDown className="size-4 text-red-base" />
      )}
      <span
        className={cn(
          'text-sm font-medium',
          type === 'income' ? 'text-green-dark' : 'text-red-dark'
        )}
      >
        {type === 'income' ? 'Entrada' : 'Saída'}
      </span>
    </div>
  )
}

export { TransactionType }
