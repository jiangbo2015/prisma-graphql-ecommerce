/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductById
// ====================================================

export interface ProductById_productById {
    __typename: 'Product'
    id: number
    title: string
    description: string | null
    price: number
    image: string
}

export interface ProductById {
    productById: ProductById_productById
}

export interface ProductByIdVariables {
    id: number
}
