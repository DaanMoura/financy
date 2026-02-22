import type { CategoryColorName } from "@/types"
import { categoryColors } from "@/constants/colors"

export const getCategoryColor = (color: CategoryColorName) => {
  return categoryColors[color] ?? categoryColors.green
}