/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionList
// ====================================================

export interface CollectionList_collectionList {
  __typename: "Collection";
  id: number;
  title: string;
  description: string | null;
}

export interface CollectionList {
  collectionList: CollectionList_collectionList[];
}
