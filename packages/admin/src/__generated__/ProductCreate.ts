/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ProductCreate
// ====================================================

export interface ProductCreate_productCreate_collections {
  __typename: "Collection";
  id: number;
  title: string;
  description: string | null;
}

export interface ProductCreate_productCreate {
  __typename: "Product";
  id: number;
  title: string;
  description: string | null;
  price: number;
  image: string;
  collections: (ProductCreate_productCreate_collections | null)[] | null;
}

export interface ProductCreate {
  productCreate: ProductCreate_productCreate;
}

export interface ProductCreateVariables {
  data: ProductInput;
}
