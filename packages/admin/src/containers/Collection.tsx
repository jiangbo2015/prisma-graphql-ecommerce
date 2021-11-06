import { useState } from 'react'
import { Box, Button } from '@mui/material'
import CollectionModal from 'src/components/CollectionModal'
import Layout from 'src/components/Layout'
import Table, { Column } from 'src/components/Table'

import {
    useCreateCollection,
    useUpdateCollection,
    useDelCollection,
    useCollectionList,
} from 'src/graphql/Collection'
import { CollectionInput } from 'src/__generated__/globalTypes'
import { CollectionModalProps } from 'types'

export default function BasicTable() {
    const [open, setOpen] = useState(false)
    const [editData, setEditData] = useState<CollectionInput>(
        {} as CollectionInput
    )

    const { mutate: mutateCreate } = useCreateCollection()
    const { mutate: mutateDelete } = useDelCollection()
    const { mutate: mutateUpdate } = useUpdateCollection()
    const { data } = useCollectionList()

    const handleCreate: CollectionModalProps['handleCreate'] = (values) => {
        setOpen(false)
        mutateCreate({
            variables: {
                data: values,
            },
        })
    }

    const handleUpdate: CollectionModalProps['handleUpdate'] = (values) => {
        setOpen(false)
        mutateUpdate({
            variables: {
                data: values,
            },
        })
    }

    const handleDelete = (id: number) => {
        mutateDelete({
            variables: {
                id,
            },
        })
    }

    const handleOpenEdit = (row) => () => {
        setEditData(row)
        setOpen(true)
    }

    const handleOpenAdd = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setEditData({} as CollectionInput)
    }

    const columns: Column[] = [
        {
            title: 'Title',
            field: 'title',
        },
        {
            title: 'Description',
            field: 'description',
        },
        {
            title: 'Action',
            field: 'action',
            render: (record) => (
                <>
                    <Button onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                    <Button onClick={handleOpenEdit(record)}>Edit</Button>
                </>
            ),
        },
    ]

    return (
        <Layout>
            {open && (
                <CollectionModal
                    open={open}
                    handleClose={handleClose}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                    editData={editData}
                ></CollectionModal>
            )}
            <Box display={'flex'} justifyContent="flex-end" mb={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAdd}
                >
                    Add
                </Button>
            </Box>
            <Table columns={columns} dataSource={data?.collectionList || []} />
        </Layout>
    )
}
