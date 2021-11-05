import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Button,
} from '@mui/material'
import CollectionModal from 'src/components/CollectionModal'
import Layout from 'src/components/Layout'

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
            <Grid container justifyContent="flex-end" mb={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAdd}
                >
                    Add
                </Button>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.collectionList?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">
                                    {row.description}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button onClick={handleOpenEdit}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}
