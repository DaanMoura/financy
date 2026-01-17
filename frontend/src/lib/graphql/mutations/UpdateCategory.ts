import { gql } from '@apollo/client'

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($data: UpdateCategoryInput!, $id: String!) {
    updateCategory(data: $data, id: $id) {
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
