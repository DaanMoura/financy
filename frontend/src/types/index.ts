import type { CATEGORY_COLOR_NAMES } from "@/constants/colors"

export type CategoryColorName = typeof CATEGORY_COLOR_NAMES[number]

export interface User {
  id: string
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export enum CategoryIcon {
  BRIEFCASE = 'BRIEFCASE',
  CAR = 'CAR',
  EDUCATION = 'EDUCATION',
  FITNESS = 'FITNESS',
  FOOD = 'FOOD',
  GIFT = 'GIFT',
  HEALTH = 'HEALTH',
  HOME = 'HOME',
  PET = 'PET',
  PIGGY_BANK = 'PIGGY_BANK',
  RECEIPT = 'RECEIPT',
  SHOPPING_CART = 'SHOPPING_CART',
  TICKET = 'TICKET',
  TRAVEL = 'TRAVEL',
  WALLET = 'WALLET',
  WORK = 'WORK'
}

export interface Category {
  id: string
  title: string
  description?: string | null
  color: CategoryColorName
  icon: CategoryIcon
  transactions: { id: string }[]
  createdAt?: string
  updatedAt?: string
}

export interface CreateCategoryInput {
  title: string
  description?: string
  color: CategoryColorName
  icon: CategoryIcon
}

export interface UpdateCategoryInput {
  title?: string
  description?: string
  color?: string
  icon?: CategoryIcon
}

export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}

export interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  type: TransactionType
  categoryId: string
  category?: Category | null
  userId: string
  user?: User | null
  createdAt: string
  updatedAt: string
}

export interface CreateTransactionInput {
  description: string
  amount: number
  date: string
  type: TransactionType
  categoryId: string
}

export interface CreateUserInput {
  name: string
  email: string
}

export interface Summary {
  balance: number
  monthIncome: number
  monthExpense: number
}
