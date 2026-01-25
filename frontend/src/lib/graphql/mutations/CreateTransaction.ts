import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Category, CreateTransactionInput, Transaction } from '../../../types'

export interface CreateTransactionMutation {
  createTransaction: Pick<
    Transaction,
    'id' | 'description' | 'amount' | 'date' | 'type' | 'categoryId' | 'createdAt' | 'updatedAt'
  > & {
    category: Pick<Category, 'id' | 'title' | 'color' | 'icon'>
  }
}

export interface CreateTransactionMutationVariables {
  data: CreateTransactionInput
}

export const CREATE_TRANSACTION: TypedDocumentNode<
  CreateTransactionMutation,
  CreateTransactionMutationVariables
> = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
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
