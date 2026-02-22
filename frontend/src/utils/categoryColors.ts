import type { CategoryColorName } from '@/types'
import { categoryColors } from '@/constants/colors'

export const getCategoryColor = (color: CategoryColorName | undefined | null) => {
  return categoryColors[color ?? 'green'] ?? categoryColors.green
}
