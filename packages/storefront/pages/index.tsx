import Layout from '../components/Layout'
import { Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProductItem from '../components/ProductItem'
import { gql } from '@apollo/client'
import client from '../client'

const useStyles = makeStyles({
    root: {},
    media: {
        paddingTop: '60%',
    },
    actions: {
        justifyContent: 'center',
    },
})

export default ({ allProducts = [] }) => {
    const classes = useStyles()
    return (
        <Layout>
            <Box py="20px">
                <Typography variant="h3">Hot Product</Typography>
            </Box>
            <Grid container spacing={4}>
                {allProducts?.map((item) => (
                    <ProductItem key={item.id} item={item}></ProductItem>
                ))}
            </Grid>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
                query AllProducts {
                    allProducts {
                        id
                        title
                        slug
                        price
                    }
                }
            `,
        })
        return {
            props: {
                allProducts: data.allProducts,
            },
        }
    } catch (e) {
        console.log(e, 'errors')
    }
    return {
        props: {},
    }
}
