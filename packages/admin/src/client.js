import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
    Observable,
    makeVar,
} from '@apollo/client'

import { onError } from '@apollo/client/link/error'

export const toastVar = makeVar({ open: false, message: '' })

// Log any GraphQL errors or network error that occurred
const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(
                ({ message, locations, path, extensions }) => {
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )

                    // global toast message
                    toastVar({ open: true, message })

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
            toastVar({ open: true, message: networkError })
            return Observable.of(operation)
        }
        return forward(operation)
    }
)

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/',
    headers: {
        Authorization: `Bearer ${localStorage.token}`,
    },
})

const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
})

export default client
