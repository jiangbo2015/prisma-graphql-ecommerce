import { Button } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
import client from '../client'

const queryUser = gql`
    query Myquery {
        allUsers {
            name
            id
        }
    }
`

export default function App({ users }) {
    const { data, error } = useQuery(queryUser)
    console.log(data, error, 'd')

    return (
        <div>
            <Button>{users?.length}test</Button>
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
                query MyQuery {
                    allUsers {
                        name
                        id
                    }
                }
            `,
        })
        console.log(data, 'data')

        return {
            props: {
                users: data,
            },
        }
    } catch (e) {
        console.log(e, 'errors')
    }
    return {
        props: {},
    }
}
