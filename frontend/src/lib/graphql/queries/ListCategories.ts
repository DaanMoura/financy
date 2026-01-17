import { gql } from '@apollo/client'

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      color
      icon
      createdAt
      updatedAt
    }
  }
`
