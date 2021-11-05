/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerLoginInput } from './globalTypes'

// ====================================================
// GraphQL mutation operation: CustomerLogin
// ====================================================

export interface CustomerLogin_customerLogin {
    __typename: 'Customer'
    email: string
    token: string
}

export interface CustomerLogin {
    customerLogin: CustomerLogin_customerLogin
}

export interface CustomerLoginVariables {
    data: CustomerLoginInput
}
