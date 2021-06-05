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
import ProductModal from '../components/ProductModel'
import {
    ProductCreateInput,
    ProductUpdateInput,
} from '../__generated__/globalTypes'
import { omit } from 'lodash'

import {
    GET_ALL_PRODUCTS,
    useCreateProduct,
    useUpdateProduct,
    useDelProduct,
} from '../graphql/Product'
import {
    AllProducts,
    AllProducts_allProducts,
} from 'src/__generated__/AllProducts'

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
    const [editData, setEditData] = useState<ProductUpdateInput | null>(null)

    const { mutate } = useCreateProduct()
    const { mutate: mutateDel } = useDelProduct()
    const { mutate: mutateUpdate } = useUpdateProduct()
    const { data } = useQuery<AllProducts>(GET_ALL_PRODUCTS)

    const handleConfim = (values: ProductCreateInput) => {
        setOpen(false)
        mutate({
            variables: {
                data: values,
            },
        })
    }

    const handleConfirmUpdate = (values: ProductUpdateInput) => {
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

    const handleUpdate = (row: AllProducts_allProducts) => {
        const updateProps: ProductUpdateInput = {
            ...omit(row, ['collections']),
            collectionId: row.collections[0].id,
        }
        setEditData(updateProps)
        setOpen(true)
    }

    const handleAdd = () => {
        setEditData(null)
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
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.allProducts?.map((row) => (
                            <TableRow key={row.title}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.slug}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.image}</TableCell>
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
