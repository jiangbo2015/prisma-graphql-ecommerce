import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    // uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    ssrMode: true,
    link: new HttpLink({
        uri: 'http://localhost:4000/',
    }),

    connectToDevTools: true,
})

export default client
