import Layout from 'components/Layout'
import { Grid, Typography, Box } from '@mui/material'
import {makeStyles} from '@mui/styles';
import ProductItem from 'components/ProductItem'
import { gql } from '@apollo/client'
import client from 'client'
import { PRODUCT_LIST } from 'gql/query'
import { ProductList } from '__generated__/ProductList'

const useStyles = makeStyles({
    root: {},
    media: {
        paddingTop: '60%',
    },
    actions: {
        justifyContent: 'center',
    },
})

export default ({ productList = [] }: ProductList) => {
    const classes = useStyles()
    return (
        <Layout>
            <Box py="20px">
                <Typography variant="h3">Hot Product</Typography>
            </Box>
            <Grid container spacing={4}>
                {productList?.map((item) => (
                    <ProductItem key={item.id} item={item}></ProductItem>
                ))}
            </Grid>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const { data } = await client.query<ProductList>({
            query: PRODUCT_LIST,
        })
        return {
            props: {
                productList: data.productList,
            },
        }
    } catch (e) {
        console.log(e, 'errors')
    }
    return {
        props: {},
    }
}
