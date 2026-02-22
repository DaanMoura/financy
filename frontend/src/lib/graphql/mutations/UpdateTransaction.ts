import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Category, Transaction, UpdateTransactionInput } from '../../../types'

export interface UpdateTransactionMutation {
  updateTransaction: Pick<
    Transaction,
    'id' | 'description' | 'amount' | 'date' | 'type' | 'categoryId' | 'createdAt' | 'updatedAt'
  > & {
    category: Pick<Category, 'id' | 'title' | 'color' | 'icon'>
  }
}

export interface UpdateTransactionMutationVariables {
  data: UpdateTransactionInput
  id: string
}

export const UPDATE_TRANSACTION: TypedDocumentNode<
  UpdateTransactionMutation,
  UpdateTransactionMutationVariables
> = gql`
  mutation UpdateTransaction($data: UpdateTransactionInput!, $id: String!) {
    updateTransaction(data: $data, id: $id) {
      id
      description
      amount
      date
      type
      categoryId
      category {
        id
        title
        color
        icon
      }
      createdAt
      updatedAt
    }
  }
`
