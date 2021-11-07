import { Grid, Typography, Box } from '@mui/material'
import Layout from 'src/components/Layout'
import ProductItem from 'src/components/ProductItem'
import client from 'src/client'
import { PRODUCT_LIST } from 'src/gql/query'
import { ProductList } from '__generated__/ProductList'

export default function Home({ productList = [] }: ProductList) {
    return (
        <Layout>
            {/* <Box py="20px">
                <Typography variant="h3">Hot Product</Typography>
            </Box> */}
            <Grid container spacing={4}>
                {productList?.map((item) => (
                    <ProductItem key={item.id} item={item}></ProductItem>
                ))}
            </Grid>
        </Layout>
    )
}

export async function getStaticProps() {
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
        return {
            props: {},
        }
    }
}
