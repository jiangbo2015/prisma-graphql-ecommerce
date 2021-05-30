/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProduct
// ====================================================

export interface CreateProduct_createProduct_collections {
  __typename: "Collection";
  id: number;
  name: string;
}

export interface CreateProduct_createProduct {
  __typename: "Product";
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  collections: CreateProduct_createProduct_collections[];
}

export interface CreateProduct {
  createProduct: CreateProduct_createProduct;
}

export interface CreateProductVariables {
  data: ProductCreateInput;
}
