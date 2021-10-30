/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductList
// ====================================================

export interface ProductList_productList {
  __typename: "Product";
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface ProductList {
  productList: ProductList_productList[];
}
