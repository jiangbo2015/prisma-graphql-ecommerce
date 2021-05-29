import Layout from '../components/Layout'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
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
import CollectionModal from '../components/CollectionModal'
import { CollectionCreateInput, CollectionUpdateInput } from '../__generated__/globalTypes'
import {
    useCreateCollection,
    useUpdateCollection,
    useDelCollection,
    GET_ALL_COLLECTIONS,
} from '../graphql/Collection'
import { AllCollections } from '../__generated__/AllCollections'

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
    const [editData, setEditData] = useState<CollectionUpdateInput | null>(null)

    const { mutate } = useCreateCollection()
    const { mutate: mutateDel } = useDelCollection()
    const { mutate: mutateUpdate } = useUpdateCollection()
    const { data } = useQuery<AllCollections>(GET_ALL_COLLECTIONS)

    const handleConfim = (values: CollectionCreateInput) => {
        setOpen(false)
        mutate({
            variables: {
                data: values,
            },
        })
    }

    const handleConfirmUpdate = (values: CollectionUpdateInput) => {
        setOpen(false)
        mutateUpdate({
            variables: {
                data: values,
            },
        })
    }

    const handleDel = (id: number) => {
        mutateDel({
            variables: {
                id,
            },
        })
    }

    const handleUpdate = (row: CollectionUpdateInput) => {
        setEditData(row)
        setOpen(true)
    }

    const handleAdd = () => {
        setEditData(null)
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
                            <TableCell align="right">Slug</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.allCollections?.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.slug}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleDel(row.id)}>删除</Button>
                                    <Button onClick={() => handleUpdate(row)}>编辑</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}
