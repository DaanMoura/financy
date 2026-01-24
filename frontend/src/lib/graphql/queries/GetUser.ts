import { gql, type TypedDocumentNode } from '@apollo/client'
import type { User } from '../../../types'

export interface GetUserQuery {
  getUser: Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>
}

export interface GetUserQueryVariables {
  id: string
}

export const GET_USER: TypedDocumentNode<GetUserQuery, GetUserQueryVariables> = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`
