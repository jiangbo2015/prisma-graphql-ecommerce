import { gql, useMutation } from '@apollo/client'
import * as CreateCollectionTypes from '../__generated__/CreateCollection'
import { AllCollections } from '../__generated__/AllCollections'
import { DelCollection } from '../__generated__/DelCollection'
import * as UpdateCollectionTypes from '../__generated__/UpdateCollection'

export const GET_ALL_COLLECTIONS = gql`
    query AllCollections {
        allCollections {
            id
            name
            slug
        }
    }
`

export const CREATE_COLLECTION = gql`
    mutation CreateCollection($data: CollectionCreateInput!) {
        createCollection(data: $data) {
            id
            name
            slug
        }
    }
`

export const UPDATE_COLLECTION = gql`
    mutation UpdateCollection($data: CollectionUpdateInput!) {
        updateCollection(data: $data) {
            id
            name
            slug
        }
    }
`

export const DEL_COLLECTION = gql`
    mutation DelCollection($id: Float!) {
        delCollection(id: $id) {
            id
        }
    }
`

export const useCreateCollection = () => {
    const [mutate, { data, error, loading }] = useMutation<
        CreateCollectionTypes.CreateCollection,
        CreateCollectionTypes.CreateCollectionVariables
    >(CREATE_COLLECTION, {
        update: (cache, { data }) => {
            const newData = data?.createCollection
            const existData = cache.readQuery<AllCollections>({
                query: GET_ALL_COLLECTIONS,
            })?.allCollections
            if (existData && newData) {
                cache.writeQuery<AllCollections>({
                    query: GET_ALL_COLLECTIONS,
                    data: {
                        allCollections: existData.concat(newData),
                    },
                })
            }
        },
    })
    return { mutate, data, error, loading }
}

export const useUpdateCollection = () => {
    const [mutate, { data, error, loading }] = useMutation<
        UpdateCollectionTypes.UpdateCollection,
        UpdateCollectionTypes.UpdateCollectionVariables
    >(UPDATE_COLLECTION, {
        update: (cache, { data }) => {
            const newData = data?.updateCollection
            const existData = cache.readQuery<AllCollections>({
                query: GET_ALL_COLLECTIONS,
            })?.allCollections
            if (existData && newData) {
                const index = existData.findIndex((x) => x.id === newData.id)
                const cloneData = [...existData]
                cloneData.splice(index, 1, newData)
                cache.writeQuery<AllCollections>({
                    query: GET_ALL_COLLECTIONS,
                    data: {
                        allCollections: cloneData,
                    },
                })
            }
        },
    })
    return { mutate, data, error, loading }
}

export const useDelCollection = () => {
    const [mutate, { data, error, loading }] = useMutation<DelCollection>(DEL_COLLECTION, {
        update: (cache, { data }) => {
            const id = data?.delCollection.id
            const existData = cache.readQuery<AllCollections>({
                query: GET_ALL_COLLECTIONS,
            })?.allCollections
            if (existData && id) {
                cache.writeQuery<AllCollections>({
                    query: GET_ALL_COLLECTIONS,
                    data: {
                        allCollections: existData.filter((item) => item.id !== id),
                    },
                })
            }
        },
    })
    return { mutate, data, error, loading }
}
