import Layout from 'src/components/Layout'
import { Grid, Box } from '@mui/material'
import ProductItem from 'src/components/ProductItem'
import { initializeApollo } from 'src/client'
import { PRODUCT_LIST } from 'src/gql/query'
import { ProductList } from '__generated__/ProductList'

export default function Products({ productList = [] }: ProductList) {
    return (
        <Layout>
            <Box pt="50px">
                <Grid container spacing={4}>
                    {productList?.map((item) => (
                        <ProductItem key={item.id} item={item}></ProductItem>
                    ))}
                </Grid>
            </Box>
        </Layout>
    )
}

export async function getServerSideProps() {
    const apolloClient = initializeApollo()
    try {
        const { data } = await apolloClient.query<ProductList>({
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
