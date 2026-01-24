import { CategoryIcon } from '@/types'
import type { IconName } from 'lucide-react/dynamic'

export const getCategoryIconName = (icon: CategoryIcon): IconName => {
  switch (icon) {
    case CategoryIcon.FOOD:
      return 'utensils'
    case CategoryIcon.TICKET:
      return 'ticket'
    case CategoryIcon.PIGGY_BANK:
      return 'piggy-bank'
    case CategoryIcon.SHOPPING_CART:
      return 'shopping-cart'
    case CategoryIcon.BRIEFCASE:
      return 'briefcase'
    case CategoryIcon.HEALTH:
      return 'heart'
    case CategoryIcon.CAR:
      return 'car'
    case CategoryIcon.GIFT:
      return 'gift'
    case CategoryIcon.EDUCATION:
      return 'graduation-cap'
    case CategoryIcon.FITNESS:
      return 'dumbbell'
    case CategoryIcon.HOME:
      return 'home'
    case CategoryIcon.PET:
      return 'paw-print'
    case CategoryIcon.RECEIPT:
      return 'receipt'
    case CategoryIcon.TRAVEL:
      return 'plane'
    case CategoryIcon.WALLET:
      return 'wallet'
    case CategoryIcon.WORK:
      return 'briefcase'
    default:
      return 'utensils'
  }
}
