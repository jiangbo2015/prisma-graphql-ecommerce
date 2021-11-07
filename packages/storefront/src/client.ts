import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    from,
    Observable,
    NormalizedCacheObject,
} from '@apollo/client'
import { useMemo } from 'react'

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
    uri: 'http://localhost:4000',
    // process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:4000'
    //     : 'https://pgfe-server.herokuapp.com',
})

let apolloClient

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(
    initialState = null
): ApolloClient<NormalizedCacheObject> {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState)
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store
}
