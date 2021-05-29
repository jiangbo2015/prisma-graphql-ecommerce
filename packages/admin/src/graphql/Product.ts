import { gql, useQuery } from '@apollo/client'

export const GET_ALL_PRODUCTS = gql`
    query AllProducts {
        allProducts {
            title
            price
            image
        }
    }
`
