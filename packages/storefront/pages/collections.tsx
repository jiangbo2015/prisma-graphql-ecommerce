import Layout from '../components/Layout'
import { Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CollectionItem from '../components/CollectionItem'
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

export default ({ allCollections = [] }) => {
    const classes = useStyles()
    return (
        <Layout>
            <Box pt="50px">
                <Grid container spacing={4}>
                    {allCollections?.map((item) => (
                        <CollectionItem
                            key={item.id}
                            item={item}
                        ></CollectionItem>
                    ))}
                </Grid>
            </Box>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
                query AllCollections {
                    allCollections {
                        id
                        name
                        slug
                        productCount
                    }
                }
            `,
        })
        return {
            props: {
                allCollections: data.allCollections,
            },
        }
    } catch (e) {
        console.log(e, 'errors')
    }
    return {
        props: {},
    }
}
