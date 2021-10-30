import { gql, useMutation, useQuery } from '@apollo/client'
import {
    CollectionCreate,
    CollectionCreateVariables,
} from 'src/__generated__/CollectionCreate'
import { CollectionDelete } from 'src/__generated__/CollectionDelete'
import { CollectionList } from 'src/__generated__/CollectionList'
import {
    CollectionUpdate,
    CollectionUpdateVariables,
} from 'src/__generated__/CollectionUpdate'

export const COLLECTION_LIST = gql`
    query CollectionList {
        collectionList {
            id
            title
            description
        }
    }
`

export const COLLECTION_CREATE = gql`
    mutation CollectionCreate($data: CollectionBaseInput!) {
        collectionCreate(data: $data) {
            id
            title
            description
        }
    }
`

export const COLLECTION_UPDATE = gql`
    mutation CollectionUpdate($id: Int!, $data: CollectionBaseInput!) {
        collectionUpdate(data: $data, id: $id) {
            id
            title
            description
        }
    }
`

export const COLLECTION_DELETE = gql`
    mutation CollectionDelete($id: Int!) {
        collectionDelete(id: $id) {
            id
        }
    }
`

export const useCollectionList = () => {
    const { data } = useQuery<CollectionList>(COLLECTION_LIST)
    return { data }
}

export const useCreateCollection = () => {
    const [mutate, { data, error, loading }] = useMutation<
        CollectionCreate,
        CollectionCreateVariables
    >(COLLECTION_CREATE, {
        update: (cache, { data }) => {
            const newData = data?.collectionCreate
            const existData = cache.readQuery<CollectionList>({
                query: COLLECTION_LIST,
            })?.collectionList

            if (existData && newData) {
                cache.writeQuery<CollectionList>({
                    query: COLLECTION_LIST,
                    data: {
                        collectionList: existData.concat(newData),
                    },
                })
            }
        },
    })
    return { mutate, data, error, loading }
}

export const useUpdateCollection = () => {
    const [mutate, { data, error, loading }] = useMutation<
        CollectionUpdate,
        CollectionUpdateVariables
    >(COLLECTION_UPDATE, {
        update: (cache, { data }) => {
            const newData = data?.collectionUpdate
            const existData = cache.readQuery<CollectionList>({
                query: COLLECTION_LIST,
            })?.collectionList

            if (existData && newData) {
                const index = existData.findIndex((x) => x.id === newData.id)
                const cloneData = [...existData]
                cloneData.splice(index, 1, newData)
                cache.writeQuery({
                    query: COLLECTION_LIST,
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
    const [mutate, { data, error, loading }] = useMutation<CollectionDelete>(
        COLLECTION_DELETE,
        {
            update: (cache, { data }) => {
                const id = data?.collectionDelete.id
                const existData = cache.readQuery<CollectionList>({
                    query: COLLECTION_LIST,
                })?.collectionList

                if (existData && id) {
                    cache.writeQuery<CollectionList>({
                        query: COLLECTION_LIST,
                        data: {
                            collectionList: existData.filter(
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
