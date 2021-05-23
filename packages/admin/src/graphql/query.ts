import { gql } from '@apollo/client'

export const GET_ALL_COLLECTIONS = gql`
    query AllCollections {
        allCollections {
            name
            slug
        }
    }
`

export const GET_ALL_PRODUCTS = gql`
    query AllProducts {
        allProducts {
            title
            price
            image
        }
    }
`
