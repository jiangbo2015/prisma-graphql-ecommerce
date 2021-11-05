/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CollectionCreate
// ====================================================

export interface CollectionCreate_collectionCreate {
  __typename: "Collection";
  id: number;
  title: string;
  description: string | null;
}

export interface CollectionCreate {
  collectionCreate: CollectionCreate_collectionCreate;
}

export interface CollectionCreateVariables {
  data: CollectionInput;
}
