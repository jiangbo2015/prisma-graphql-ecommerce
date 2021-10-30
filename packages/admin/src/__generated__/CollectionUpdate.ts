/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionBaseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CollectionUpdate
// ====================================================

export interface CollectionUpdate_collectionUpdate {
  __typename: "Collection";
  id: number;
  title: string;
  description: string | null;
}

export interface CollectionUpdate {
  collectionUpdate: CollectionUpdate_collectionUpdate;
}

export interface CollectionUpdateVariables {
  id: number;
  data: CollectionBaseInput;
}
