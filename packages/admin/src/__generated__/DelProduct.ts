/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DelProduct
// ====================================================

export interface DelProduct_delProduct_collections {
  __typename: "Collection";
  id: number;
  name: string;
}

export interface DelProduct_delProduct {
  __typename: "Product";
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  collections: DelProduct_delProduct_collections[];
}

export interface DelProduct {
  delProduct: DelProduct_delProduct;
}

export interface DelProductVariables {
  id: number;
}
