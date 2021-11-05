/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ProductUpdate
// ====================================================

export interface ProductUpdate_productUpdate_collections {
  __typename: "Collection";
  id: number;
  title: string;
  description: string | null;
}

export interface ProductUpdate_productUpdate {
  __typename: "Product";
  id: number;
  title: string;
  description: string | null;
  price: number;
  image: string;
  collections: (ProductUpdate_productUpdate_collections | null)[] | null;
}

export interface ProductUpdate {
  productUpdate: ProductUpdate_productUpdate;
}

export interface ProductUpdateVariables {
  data: ProductInput;
}
