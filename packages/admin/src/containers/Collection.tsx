import Layout from '../components/Layout'
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
import CollectionModal from '../components/CollectionModal'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    operation: {
        marginBottom: '20px',
    },
})

const rows = [
    {
        name: '001',
        slug: '001',
    },
    {
        name: '001',
        slug: '001',
    },
    {
        name: '001',
        slug: '001',
    },
]

export default function BasicTable() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleConfim = (values: object) => {
        console.log(values)
        setOpen(false)
    }

    return (
        <Layout>
            <CollectionModal
                open={open}
                handleClose={() => setOpen(false)}
                handleConfirm={() => {}}
            ></CollectionModal>
            <Grid container justify="flex-end" className={classes.operation}>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
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
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.slug}</TableCell>
                                <TableCell align="right">删除</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}
