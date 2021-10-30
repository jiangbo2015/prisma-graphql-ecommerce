import { gql, useMutation, useQuery } from '@apollo/client'
import {
    ProductCreate,
    ProductCreateVariables,
} from 'src/__generated__/ProductCreate'
import {
    ProductDelete,
    ProductDeleteVariables,
} from 'src/__generated__/ProductDelete'
import { ProductList } from 'src/__generated__/ProductList'
import {
    ProductUpdate,
    ProductUpdateVariables,
} from 'src/__generated__/ProductUpdate'

const ProductFragment = gql`
    fragment ProductFragment on Product {
        id
        title
        description
        price
        image
        collections {
            id
            title
            description
        }
    }
`

export const PRODUCT_LIST = gql`
    query ProductList {
        productList {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`

export const PRODUCT_CREATE = gql`
    mutation ProductCreate($data: ProductBaseInput!, $collectionId: Float!) {
        productCreate(data: $data, collectionId: $collectionId) {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`

export const PRODUCT_UPDATE = gql`
    mutation ProductUpdate(
        $id: Int!
        $collectionId: Float!
        $data: ProductBaseInput!
    ) {
        productUpdate(collectionId: $collectionId, data: $data, id: $id) {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`

export const PRODUCT_DELETE = gql`
    mutation ProductDelete($id: Int!) {
        productDelete(id: $id) {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`

export const useProductList = () => {
    const { data } = useQuery<ProductList>(PRODUCT_LIST)
    return { data }
}

export const useCreateProduct = () => {
    const [mutate] = useMutation<ProductCreate, ProductCreateVariables>(
        PRODUCT_CREATE,
        {
            update: (cache, { data }) => {
                const newData = data?.productCreate
                const existData = cache.readQuery<ProductList>({
                    query: PRODUCT_LIST,
                })?.productList
                if (existData && newData) {
                    cache.writeQuery<ProductList>({
                        query: PRODUCT_LIST,
                        data: {
                            productList: existData.concat(newData),
                        },
                    })
                }
            },
        }
    )
    return { mutate }
}

export const useUpdateProduct = () => {
    const [mutate, { data, error, loading }] = useMutation<
        ProductUpdate,
        ProductUpdateVariables
    >(PRODUCT_UPDATE, {
        update: (cache, { data }) => {
            const newData = data?.productUpdate
            const existData = cache.readQuery<ProductList>({
                query: PRODUCT_LIST,
            })?.productList
            if (existData && newData) {
                const index = existData.findIndex((x) => x.id === newData.id)
                const cloneData = [...existData]
                cloneData.splice(index, 1, newData)
                cache.writeQuery({
                    query: PRODUCT_LIST,
                    data: {
                        allProducts: cloneData,
                    },
                })
            }
        },
    })
    return { mutate, data, error, loading }
}

export const useDeleteProduct = () => {
    const [mutate, { data, error, loading }] = useMutation<
        ProductDelete,
        ProductDeleteVariables
    >(PRODUCT_DELETE, {
        update: (cache, { data }) => {
            const id = data?.productDelete.id
            const existData = cache.readQuery<ProductList>({
                query: PRODUCT_LIST,
            })?.productList
            if (existData && id) {
                cache.writeQuery<ProductList>({
                    query: PRODUCT_LIST,
                    data: {
                        productList: existData.filter((item) => item.id !== id),
                    },
                })
            }
        },
    })
    return { mutate, data, error, loading }
}
