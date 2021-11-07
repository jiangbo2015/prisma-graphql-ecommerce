import { gql } from '@apollo/client'

export const COLLECTION_LIST = gql`
    query CollectionList {
        collectionList {
            id
            title
            description
        }
    }
`

export const PRODUCT_LIST = gql`
    query ProductList {
        productList {
            id
            title
            price
            image
        }
    }
`

export const PRODUCT_BY_ID = gql`
    query ProductById($id: Float!) {
        productById(id: $id) {
            id
            title
            description
            price
            image
        }
    }
`
