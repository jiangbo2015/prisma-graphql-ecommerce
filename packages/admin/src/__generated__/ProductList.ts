/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductList
// ====================================================

export interface ProductList_productList_collections {
  __typename: "Collection";
  id: number;
  title: string;
  description: string | null;
}

export interface ProductList_productList {
  __typename: "Product";
  id: number;
  title: string;
  description: string | null;
  price: number;
  image: string;
  collections: (ProductList_productList_collections | null)[] | null;
}

export interface ProductList {
  productList: ProductList_productList[];
}
