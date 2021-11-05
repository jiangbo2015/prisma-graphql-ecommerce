import { gql, useMutation } from '@apollo/client'

export const USER_LOGIN = gql`
    mutation UserLogin($data: UserLoginInput!) {
        userLogin(data: $data) {
            token
            email
        }
    }
`

export const useLogin = () => {
    const [mutate, { data, error, loading }] = useMutation(USER_LOGIN, {
        // onError: () => {},
    })
    return { mutate, data, error, loading }
}
