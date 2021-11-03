import { ApolloClient, HttpLink, InMemoryCache, from, Observable } from '@apollo/client'

import { onError } from '@apollo/client/link/error'

// Log any GraphQL errors or network error that occurred
const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(
                ({ message, locations, path, extensions }) => {
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )

                    // if UNAUTHENTICATED, go to login page
                    if (extensions?.code === 'UNAUTHENTICATED') {
                        window.location.assign('/login')
                    }
                }
            )
            return Observable.of(operation)
        }

        if (networkError) {
            console.log(`[Network error]: ${networkError}`)
            return Observable.of(operation)
        }
        return forward(operation)
    }
)

const httpLink = new HttpLink({
        uri:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:4000'
                : 'https://pgfe-server.herokuapp.com',
    })

const client = new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: from([errorLink, httpLink]),

    connectToDevTools: true,
})

export default client
