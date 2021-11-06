import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    TableCellProps,
} from '@mui/material'

export type Column = {
    title: string
    field: string
    align?: TableCellProps['align']
    render?: (record: any) => React.ReactNode
}

type DataSource = any[]

export default function MyTable({
    dataSource,
    columns,
}: {
    dataSource: DataSource
    columns: Column[]
}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((item) => (
                            <TableCell
                                align={item.align || 'left'}
                                component={'th'}
                                sx={{ fontWeight: 'bold' }}
                            >
                                {item.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataSource?.map((row) => (
                        <TableRow key={row.id}>
                            {columns.map((item) => (
                                <TableCell
                                    align={item.align || 'left'}
                                    scope="row"
                                >
                                    {item.render
                                        ? item.render(row)
                                        : row[item.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
