/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCollection
// ====================================================

export interface CreateCollection_createCollection {
  __typename: "Collection";
  id: number;
  name: string;
  slug: string;
}

export interface CreateCollection {
  createCollection: CreateCollection_createCollection;
}

export interface CreateCollectionVariables {
  data: CollectionCreateInput;
}
