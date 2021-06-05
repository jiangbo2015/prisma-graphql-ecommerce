import { gql, useMutation } from '@apollo/client'

import * as UserLoginTypes from '../__generated__/UserLogin'

export const USER_LOGIN = gql`
    mutation UserLogin($data: UserLoginInput!) {
        login(data: $data) {
            token
            email
        }
    }
`

export const useLogin = () => {
    const [mutate, { data, error, loading }] = useMutation<
        UserLoginTypes.UserLogin,
        UserLoginTypes.UserLoginVariables
    >(USER_LOGIN, { onError: () => {} })
    return { mutate, data, error, loading }
}
