import {
    CustomerLogin,
    CustomerLoginVariables,
} from '__generated__/CustomerLogin'
import { gql, useMutation } from '@apollo/client'
import { CustomerCreate } from '__generated__/CustomerCreate'

export const CUSTOMER_LOGIN = gql`
    mutation CustomerLogin($data: CustomerLoginInput!) {
        customerLogin(data: $data) {
            email
            token
        }
    }
`

export const CUSTOMER_CREATE = gql`
    mutation CustomerCreate($data: CustomerInput!) {
        customerCreate(data: $data) {
            id
            email
        }
    }
`

export const useCustomerLogin = () => {
    const [mutate, { data, error, loading }] = useMutation<
        CustomerLogin,
        CustomerLoginVariables
    >(CUSTOMER_LOGIN)
    return { mutate, data, error, loading }
}

export const useCustomerCreate = () => {
    const [mutate, { data, error, loading }] = useMutation<
        CustomerCreate,
        CustomerLoginVariables
    >(CUSTOMER_CREATE)
    return { mutate, data, error, loading }
}
