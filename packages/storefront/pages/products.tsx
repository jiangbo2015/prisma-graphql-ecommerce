import Layout from 'src/components/Layout'
import { Grid, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import ProductItem from 'src/components/ProductItem'
import client from 'src/client'
import { PRODUCT_LIST } from 'src/gql/query'
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
