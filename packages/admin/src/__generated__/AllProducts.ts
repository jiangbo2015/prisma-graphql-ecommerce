/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllProducts
// ====================================================

export interface AllProducts_allProducts_collections {
  __typename: "Collection";
  id: number;
  name: string;
}

export interface AllProducts_allProducts {
  __typename: "Product";
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  collections: AllProducts_allProducts_collections[];
}

export interface AllProducts {
  allProducts: AllProducts_allProducts[];
}