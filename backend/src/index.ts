import 'reflect-metadata'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from '@apollo/server'
import cors from 'cors'
import { expressMiddleware } from '@as-integrations/express5'
import { buildContext } from './graphql/context'
import { AuthResolver } from './resolvers/auth.resolver'
import { UserResolver } from './resolvers/user.resolver'
import { CategoryResolver } from './resolvers/category.resolver'
import { TransactionResolver } from './resolvers/transaction.resolver'

async function bootstrap() {
  const app = express()

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver, TransactionResolver, CategoryResolver],
    validate: false,
    emitSchemaFile: 'schema.graphql'
  })

  const server = new ApolloServer({ schema })

  await server.start()

  app.use('/graphql', cors(), express.json(), expressMiddleware(server, { context: buildContext }))

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000`)
  })
}

bootstrap()
