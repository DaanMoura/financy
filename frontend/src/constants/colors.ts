
type Color = {
  base: string
  dark: string
  light: string
}

export const CATEGORY_COLOR_NAMES = ['green', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow']

const _categoryColors: Record<string, Color> = {} 
CATEGORY_COLOR_NAMES.forEach(color => {
  _categoryColors[color] = {
    base: `${color}-base`,
    dark: `${color}-dark`,
    light: `${color}-light`
  }
})

export const CATEGORY_COLORS = _categoryColors
