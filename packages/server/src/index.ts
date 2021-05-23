import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { context } from './context'
import { GraphQLScalarType } from 'graphql'
import authChecker from './authChecker'

const app = async () => {
    const schema = await tq.buildSchema({
        resolvers: [__dirname + '/resolvers/*.ts'],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
        authChecker,
        emitSchemaFile: true,
    })

    new ApolloServer({
        context,
        cors: true,
    }).listen({ port: 4000 }, (url: any) => {
        console.log(`
🚀 Server ready at: http://localhost:4000
⭐️  See sample queries: http://pris.ly/e/ts/graphql-typegraphql#using-the-graphql-api`)
    })
}

app()
