import { MiddlewareFn } from 'type-graphql'
import { GraphqlContext } from '../graphql/context'
import { GraphQLError } from 'graphql'

export const IsAuth: MiddlewareFn<GraphqlContext> = async ({ context }, next) => {
  if (!context.user) {
    throw new GraphQLError('Not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    })
  }
  await next()
}
