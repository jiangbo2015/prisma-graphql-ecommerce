import Layout from 'src/components/Layout'
import { Box } from '@mui/material'

export default ({ params }) => {
    return (
        <Layout>
            <Box>product detail</Box>
        </Layout>
    )
}

export async function getStaticPaths() {
    console.log('getStaticPaths.......')
    const paths = [
        {
            params: { id: '1' },
        },
        {
            params: { id: '2' },
        },
    ]
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    console.log(params, 'params')
    return {
        props: {
            params,
        },
    }
}
