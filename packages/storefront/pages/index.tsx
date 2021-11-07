import { Grid, Typography, Box } from '@mui/material'
import Layout from 'src/components/Layout'
import ProductItem from 'src/components/ProductItem'
import { initializeApollo } from 'src/client'
import { PRODUCT_LIST } from 'src/gql/query'
import { ProductList } from '__generated__/ProductList'

export default function Home({ productList = [], ...others }: ProductList) {
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
    const apolloClient = initializeApollo()
    console.log('get...')
    try {
        const { data } = await apolloClient.query<ProductList>({
            query: PRODUCT_LIST,
        })
        return {
            props: {
                productList: data.productList,
                // initialApolloState: apolloClient.cache.extract(),
            },
        }
    } catch (e) {
        console.log(e, 'errors')
        return {
            props: {},
        }
    }
}
