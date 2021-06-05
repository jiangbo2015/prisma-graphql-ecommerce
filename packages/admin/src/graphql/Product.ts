import { gql, useMutation } from '@apollo/client'
import * as CreateProductTypes from '../__generated__/CreateProduct'
import * as UpdateProductTypes from '../__generated__/UpdateProduct'
import { AllProducts } from 'src/__generated__/AllProducts'
import { DelProduct } from 'src/__generated__/DelProduct'

const ProductFragment = gql`
    fragment ProductFragment on Product {
        id
        title
        slug
        price
        image
        collections {
            id
            name
        }
    }
`

export const GET_ALL_PRODUCTS = gql`
    query AllProducts {
        allProducts {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`

export const CREATE_PRODUCT = gql`
    mutation CreateProduct($data: ProductCreateInput!) {
        createProduct(data: $data) {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($data: ProductUpdateInput!) {
        updateProduct(data: $data) {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`

export const DEL_PRODUCT = gql`
    mutation DelProduct($id: Int!) {
        delProduct(id: $id) {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`

export const useCreateProduct = () => {
    const [mutate] = useMutation<
        CreateProductTypes.CreateProduct,
        CreateProductTypes.CreateProductVariables
    >(CREATE_PRODUCT, {
        update: (cache, { data }) => {
            const newData = data?.createProduct
            const existData = cache.readQuery<AllProducts>({
                query: GET_ALL_PRODUCTS,
            })?.allProducts
            if (existData && newData) {
                cache.writeQuery<AllProducts>({
                    query: GET_ALL_PRODUCTS,
                    data: {
                        allProducts: existData.concat(newData),
                    },
                })
            }
        },
    })
    return { mutate }
}

export const useUpdateProduct = () => {
    const [mutate, { data, error, loading }] = useMutation<
        UpdateProductTypes.UpdateProduct,
        UpdateProductTypes.UpdateProductVariables
    >(UPDATE_PRODUCT, {
        update: (cache, { data }) => {
            const newData = data?.updateProduct
            const existData = cache.readQuery<AllProducts>({
                query: GET_ALL_PRODUCTS,
            })?.allProducts
            if (existData && newData) {
                const index = existData.findIndex((x) => x.id === newData.id)
                const cloneData = [...existData]
                cloneData.splice(index, 1, newData)
                cache.writeQuery<AllProducts>({
                    query: GET_ALL_PRODUCTS,
                    data: {
                        allProducts: cloneData,
                    },
                })
            }
        },
    })
    return { mutate, data, error, loading }
}

export const useDelProduct = () => {
    const [mutate, { data, error, loading }] = useMutation<DelProduct>(
        DEL_PRODUCT,
        {
            update: (cache, { data }) => {
                const id = data?.delProduct.id
                const existData = cache.readQuery<AllProducts>({
                    query: GET_ALL_PRODUCTS,
                })?.allProducts
                if (existData && id) {
                    cache.writeQuery<AllProducts>({
                        query: GET_ALL_PRODUCTS,
                        data: {
                            allProducts: existData.filter(
                                (item) => item.id !== id
                            ),
                        },
                    })
                }
            },
        }
    )
    return { mutate, data, error, loading }
}
