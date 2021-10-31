import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: new HttpLink({
        uri:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:4000'
                : 'https://pgfe-server.herokuapp.com',
    }),

    connectToDevTools: true,
})

export default client
