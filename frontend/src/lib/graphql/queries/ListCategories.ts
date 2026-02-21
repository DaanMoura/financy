import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Category } from '@/types'

export interface ListCategoriesQuery {
  listCategories: Pick<Category, 'id' | 'title' | 'description' | 'color' | 'icon' | 'transactions'>[]
}

export type ListCategoriesQueryVariables = Record<string, never>

export const LIST_CATEGORIES: TypedDocumentNode<ListCategoriesQuery, ListCategoriesQueryVariables> = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      color
      icon
      transactions {
        id
      }
    }
  }
`

export interface ListCategoriesSelectQuery {
  listCategories: Pick<Category, 'id' | 'title'>[]
}

export type ListCategoriesSelectQueryVariables = Record<string, never>

export const LIST_CATEGORIES_SELECT: TypedDocumentNode<
  ListCategoriesSelectQuery,
  ListCategoriesSelectQueryVariables
> = gql`
  query ListCategoriesSelect {
    listCategories {
      id
      title
    }
  }
`
