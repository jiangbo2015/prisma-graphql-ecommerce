/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerInput } from './globalTypes'

// ====================================================
// GraphQL mutation operation: CustomerCreate
// ====================================================

export interface CustomerCreate_customerCreate {
    __typename: 'Customer'
    id: number
    email: string
}

export interface CustomerCreate {
    customerCreate: CustomerCreate_customerCreate
}

export interface CustomerCreateVariables {
    data: CustomerInput
}
