import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
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
    const { data } = useCollectionList()

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
            <Grid container justify="flex-end" className={classes.operation}>
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
