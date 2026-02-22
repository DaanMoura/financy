import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Category, CreateCategoryInput } from '../../../types'

export interface CreateCategoryMutation {
  createCategory: Pick<
    Category,
    'id' | 'title' | 'description' | 'color' | 'icon' | 'createdAt' | 'updatedAt'
  >
}

export interface CreateCategoryMutationVariables {
  data: CreateCategoryInput
}

export const CREATE_CATEGORY: TypedDocumentNode<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
> = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
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
