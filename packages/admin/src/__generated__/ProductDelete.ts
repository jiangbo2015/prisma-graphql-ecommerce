/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProductDelete
// ====================================================

export interface ProductDelete_productDelete_collections {
  __typename: "Collection";
  id: number;
  title: string;
}

export interface ProductDelete_productDelete {
  __typename: "Product";
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  collections: (ProductDelete_productDelete_collections | null)[] | null;
}

export interface ProductDelete {
  productDelete: ProductDelete_productDelete;
}

export interface ProductDeleteVariables {
  id: number;
}
