import { gql } from '@apollo/client'

export const CREATE_TRANSACTION = gql`
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
