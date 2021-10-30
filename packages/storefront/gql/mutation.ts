import {
    CustomerLogin,
    CustomerLoginVariables,
} from './../__generated__/CustomerLogin'
import { gql, useMutation } from '@apollo/client'

export const CUSTOMER_LOGIN = gql`
    mutation CustomerLogin($data: LoginInput!) {
        customerLogin(data: $data) {
            email
            token
        }
    }
`

export const CUSTOMER_CREATE = gql`
    mutation CustomerCreate($data: CustomerBaseInput!) {
        customerCreate(data: $data) {
            id
            email
        }
    }
`

export const useCustomerLogin = () => {
    const [mutate, { data, error, loading }] =
        useMutation<CustomerLogin, CustomerLoginVariables>(CUSTOMER_LOGIN)
    return { mutate, data, error, loading }
}
