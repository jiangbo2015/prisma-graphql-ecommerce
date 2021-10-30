import Layout from '../components/Layout'
import { Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CollectionItem from '../components/CollectionItem'
import { gql } from '@apollo/client'
import client from '../client'
import { COLLECTION_LIST } from 'gql/query'
import { CollectionList } from '__generated__/CollectionList'

const useStyles = makeStyles({
    root: {},
    media: {
        paddingTop: '60%',
    },
    actions: {
        justifyContent: 'center',
    },
})

export default ({ collectionList = [] }: CollectionList) => {
    const classes = useStyles()
    return (
        <Layout>
            <Box pt="50px">
                <Grid container spacing={4}>
                    {collectionList?.map((item) => (
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
        const { data } = await client.query<CollectionList>({
            query: COLLECTION_LIST,
        })
        return {
            props: {
                collectionList: data.collectionList,
            },
        }
    } catch (e) {
        console.log(e, 'errors')
    }
    return {
        props: {},
    }
}
