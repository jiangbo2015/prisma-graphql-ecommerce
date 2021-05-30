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
  name: string;
}

export interface ProductFragment {
  __typename: "Product";
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  collections: ProductFragment_collections[];
}
