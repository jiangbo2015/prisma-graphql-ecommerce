import { ApolloClient, InMemoryCache, HttpLink, from, Observable } from '@apollo/client'

import { onError } from '@apollo/client/link/error'

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        })
        return Observable.of(operation)
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
        return Observable.of(operation)
    }
    return forward(operation)
})

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/',
})

const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
})

export default client
