/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProduct
// ====================================================

export interface UpdateProduct_updateProduct_collections {
  __typename: "Collection";
  id: number;
  name: string;
}

export interface UpdateProduct_updateProduct {
  __typename: "Product";
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  collections: UpdateProduct_updateProduct_collections[];
}

export interface UpdateProduct {
  updateProduct: UpdateProduct_updateProduct;
}

export interface UpdateProductVariables {
  data: ProductUpdateInput;
}
