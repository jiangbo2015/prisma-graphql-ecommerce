import React, { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { Table, CardMedia, Box } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ProductModal from 'src/components/ProductModel'
import Layout from 'src/components/Layout'

import { omit } from 'lodash'

import {
    useProductList,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
} from 'src/graphql/Product'
import { ProductBaseInput } from 'src/__generated__/globalTypes'
import { ProductUpdate_productUpdate } from 'src/__generated__/ProductUpdate'

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
    const [editData, setEditData] = useState<ProductBaseInput>(
        {} as ProductBaseInput
    )

    const { mutate: mutateCreate } = useCreateProduct()
    const { mutate: mutateDelete } = useDeleteProduct()
    const { mutate: mutateUpdate } = useUpdateProduct()
    // const { data } = useProductList()
    const data: any = {}

    const handleConfim = (values: ProductBaseInput, collectionId: number) => {
        setOpen(false)
        mutateCreate({
            variables: {
                collectionId,
                data: values,
            },
        })
    }

    const handleConfirmUpdate = (
        id: number,
        collectionId: number,
        values: ProductBaseInput
    ) => {
        setOpen(false)
        mutateUpdate({
            variables: {
                id,
                collectionId,
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

    const handleUpdate = (row: ProductUpdate_productUpdate) => {
        const updateProps = {
            ...omit(row, ['collections']),
            collectionId: row.collections?.[0]?.id,
        }
        setEditData(updateProps as ProductBaseInput)
        setOpen(true)
    }

    const handleAdd = () => {
        setEditData({} as ProductBaseInput)
        setOpen(true)
    }

    return (
        <Layout>
            {open && (
                <ProductModal
                    open={open}
                    handleClose={() => setOpen(false)}
                    handleConfirm={handleConfim}
                    handleConfirmUpdate={handleConfirmUpdate}
                    editData={editData}
                ></ProductModal>
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
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.productList?.map((row) => (
                            <TableRow key={row.title}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    style={{ maxWidth: '200px' }}
                                >
                                    {row.description}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image={row.image}
                                        alt={row.title}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => handleDel(row.id)}
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        style={{ marginLeft: '5px' }}
                                        onClick={() => handleUpdate(row)}
                                        variant="outlined"
                                    >
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
