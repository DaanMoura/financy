import { getCategoryColor } from '@/utils/categoryColors'
import { getCategoryIconName } from '@/utils/categoryIcons'
import { cn } from '@/lib/utils'
import { DynamicIcon } from 'lucide-react/dynamic'
import type { CategoryColorName, CategoryIcon } from '@/types'

type Props = {
  color?: CategoryColorName | null
  icon?: CategoryIcon
  className?: string
}

export const CategoryIconBadge = ({ color, icon, className }: Props) => {
  const { text, bgLight } = getCategoryColor(color)

  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-lg p-2.5',
        text,
        bgLight,
        className
      )}
    >
      <DynamicIcon size={16} name={getCategoryIconName(icon)} />
    </div>
  )
}
