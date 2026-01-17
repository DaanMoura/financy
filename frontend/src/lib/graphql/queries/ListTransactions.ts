import { gql } from '@apollo/client'

export const LIST_TRANSACTIONS = gql`
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
        color
        icon
      }
      createdAt
      updatedAt
    }
  }
`
