import React, { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CollectionModal from 'src/components/CollectionModal'
import Layout from 'src/components/Layout'

import {
    useCreateCollection,
    useUpdateCollection,
    useDelCollection,
    useCollectionList,
} from 'src/graphql/Collection'
import { CollectionBaseInput } from 'src/__generated__/globalTypes'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    operation: {
        marginBottom: '20px',
    },
})

export default function BasicTable() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [editData, setEditData] = useState<CollectionBaseInput>(
        {} as CollectionBaseInput
    )

    const { mutate: mutateCreate } = useCreateCollection()
    const { mutate: mutateDelete } = useDelCollection()
    const { mutate: mutateUpdate } = useUpdateCollection()
    // const { data } = useCollectionList()
    const data: any = {
        collectionList: [],
    }

    const handleConfim = (values) => {
        setOpen(false)
        mutateCreate({
            variables: {
                data: values,
            },
        })
    }

    const handleConfirmUpdate = (id, values) => {
        setOpen(false)
        mutateUpdate({
            variables: {
                id,
                data: values,
            },
        })
    }

    const handleDel = (id: number) => {
        mutateDelete({
            variables: {
                id,
            },
        })
    }

    const handleUpdate = (row) => {
        setEditData(row)
        setOpen(true)
    }

    const handleAdd = () => {
        setEditData({} as CollectionBaseInput)
        setOpen(true)
    }

    return (
        <Layout>
            {open && (
                <CollectionModal
                    open={open}
                    handleClose={() => setOpen(false)}
                    handleConfirm={handleConfim}
                    handleConfirmUpdate={handleConfirmUpdate}
                    editData={editData}
                ></CollectionModal>
            )}
            <Grid
                container
                justifyContent="flex-end"
                className={classes.operation}
            >
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add
                </Button>
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
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
                                    <Button onClick={() => handleDel(row.id)}>
                                        Delete
                                    </Button>
                                    <Button onClick={() => handleUpdate(row)}>
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
