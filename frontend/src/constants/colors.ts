import type { CategoryColorName } from "@/types"

type Color = {
  base: string
  dark: string
  light: string
}

export const CATEGORY_COLOR_NAMES = ['green', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow'] as const




export const categoryColors: Record<CategoryColorName, Color> = {} as Record<CategoryColorName, Color>
CATEGORY_COLOR_NAMES.forEach(color => {
  categoryColors[color] = {
    base: `${color}-base`,
    dark: `${color}-dark`,
    light: `${color}-light`
  }
})

