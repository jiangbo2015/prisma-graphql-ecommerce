/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductFragment
// ====================================================

export interface ProductFragment_collections {
  __typename: "Collection";
  id: number;
  title: string;
  description: string | null;
}

export interface ProductFragment {
  __typename: "Product";
  id: number;
  title: string;
  description: string | null;
  price: number;
  image: string;
  collections: (ProductFragment_collections | null)[] | null;
}
