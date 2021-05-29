/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCollection
// ====================================================

export interface UpdateCollection_updateCollection {
  __typename: "Collection";
  id: number;
  name: string;
  slug: string;
}

export interface UpdateCollection {
  updateCollection: UpdateCollection_updateCollection;
}

export interface UpdateCollectionVariables {
  data: CollectionUpdateInput;
}
