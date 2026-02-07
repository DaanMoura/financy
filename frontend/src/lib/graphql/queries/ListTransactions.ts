import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Transaction, Category } from '../../../types'

export interface ListTransactionsQuery {
  listTransactions: Array<
    Pick<
      Transaction,
      | 'id'
      | 'description'
      | 'amount'
      | 'date'
      | 'type'
      | 'categoryId'
      | 'createdAt'
      | 'updatedAt'
    > & {
      category: Pick<Category, 'id' | 'title' | 'color' | 'icon'> | null
    }
  >
}

export type ListTransactionsQueryVariables = Record<string, never>

export const LIST_TRANSACTIONS: TypedDocumentNode<
  ListTransactionsQuery,
  ListTransactionsQueryVariables
> = gql`
  query ListTransactions {
    listTransactions {
      id
      description
      amount
      date
      type
      categoryId
      category {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`
