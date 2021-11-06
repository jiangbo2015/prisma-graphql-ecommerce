import { useState } from 'react'
import {
    // Table,
    // TableBody,
    // TableCell,
    // TableContainer,
    // TableHead,
    // TableRow,
    // Paper,
    CardMedia,
    Grid,
    Button,
} from '@mui/material'
import ProductModal from 'src/components/ProductModel'
import Layout from 'src/components/Layout'
import Table, { Column } from 'src/components/Table'

import { omit } from 'lodash'
import {
    useProductList,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
} from 'src/graphql/Product'
import { ProductInput } from 'src/__generated__/globalTypes'
import { ProductList_productList } from 'src/__generated__/ProductList'

export default function BasicTable() {
    const [open, setOpen] = useState(false)
    const [editData, setEditData] = useState<ProductInput>({} as ProductInput)

    const { mutate: mutateCreate } = useCreateProduct()
    const { mutate: mutateDelete } = useDeleteProduct()
    const { mutate: mutateUpdate } = useUpdateProduct()
    const { data } = useProductList()

    const handleCreate = (values: ProductInput) => {
        setOpen(false)
        mutateCreate({
            variables: {
                data: values,
            },
        })
    }

    const handleUpdate = (values: ProductInput) => {
        setOpen(false)
        mutateUpdate({
            variables: {
                data: values,
            },
        })
    }

    const handleDelete = (id: number) => () => {
        mutateDelete({
            variables: {
                id,
            },
        })
    }

    const handleOpenUpdate = (row: ProductList_productList) => () => {
        const updateProps = {
            ...omit(row, ['collections']),
            collectionId: row.collections?.[0]?.id,
        }
        setEditData(updateProps as ProductInput)
        setOpen(true)
    }

    const handleAdd = () => {
        setEditData({} as ProductInput)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const columns: Column[] = [
        {
            title: 'Title',
            field: 'title',
        },
        {
            title: 'Description',
            field: 'description',
            maxWidth: '250px',
        },
        {
            title: 'Price',
            field: 'price',
        },
        {
            title: 'Image',
            field: 'image',
            render: (row) => (
                <CardMedia
                    component="img"
                    height="100"
                    image={row.image}
                    alt={row.title}
                />
            ),
        },
        {
            title: 'Action',
            field: 'action',
            render: (row) => (
                <>
                    <Button
                        onClick={handleDelete(row.id)}
                        variant="outlined"
                        color="secondary"
                    >
                        Delete
                    </Button>
                    <Button
                        style={{ marginLeft: '5px' }}
                        onClick={handleOpenUpdate(row)}
                        variant="outlined"
                    >
                        Edit
                    </Button>
                </>
            ),
        },
    ]

    return (
        <Layout>
            {open && (
                <ProductModal
                    open={open}
                    handleClose={handleClose}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                    editData={editData}
                ></ProductModal>
            )}
            <Grid container justifyContent="flex-end" mb={5}>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add
                </Button>
            </Grid>
            <Table columns={columns} dataSource={data?.productList || []} />
            {/* <TableContainer component={Paper}>
                <Table aria-label="simple table">
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
                                        onClick={handleOpenUpdate(row)}
                                        variant="outlined"
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Layout>
    )
}
