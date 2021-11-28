import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { context } from './src/context'
import { GraphQLScalarType } from 'graphql'
import authChecker from './src/authChecker'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const PORT = process.env.PORT || 4000

const app = async () => {
    const schema = await tq.buildSchema({
        resolvers: [__dirname + '/src/resolvers/*'],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
        authChecker,
        emitSchemaFile: true,
    })

    new ApolloServer({
        schema,
        context,
        cors: true,
        debug: true,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    }).listen({ port: PORT }, (url: any) => {
        console.log(`
🚀 Server ready at: http://localhost:${PORT}
⭐️  See sample queries: http://pris.ly/e/ts/graphql-typegraphql#using-the-graphql-api`)
    })
}

app()
