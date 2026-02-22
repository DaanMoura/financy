import type { CategoryColorName } from '@/types'

type Color = {
  bg: string
  bgLight: string
  text: string
  textDark: string
}

export const CATEGORY_COLOR_NAMES = [
  'green',
  'blue',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow'
] as const

export const categoryColors: Record<CategoryColorName, Color> = {
  green: {
    bg: 'bg-green-base',
    bgLight: 'bg-green-light',
    text: 'text-green-base',
    textDark: 'text-green-dark'
  },
  blue: {
    bg: 'bg-blue-base',
    bgLight: 'bg-blue-light',
    text: 'text-blue-base',
    textDark: 'text-blue-dark'
  },
  purple: {
    bg: 'bg-purple-base',
    bgLight: 'bg-purple-light',
    text: 'text-purple-base',
    textDark: 'text-purple-dark'
  },
  pink: {
    bg: 'bg-pink-base',
    bgLight: 'bg-pink-light',
    text: 'text-pink-base',
    textDark: 'text-pink-dark'
  },
  red: {
    bg: 'bg-red-base',
    bgLight: 'bg-red-light',
    text: 'text-red-base',
    textDark: 'text-red-dark'
  },
  orange: {
    bg: 'bg-orange-base',
    bgLight: 'bg-orange-light',
    text: 'text-orange-base',
    textDark: 'text-orange-dark'
  },
  yellow: {
    bg: 'bg-yellow-base',
    bgLight: 'bg-yellow-light',
    text: 'text-yellow-base',
    textDark: 'text-yellow-dark'
  }
}
