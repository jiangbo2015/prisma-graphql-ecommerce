/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CollectionCreateInput {
  name: string;
  slug: string;
}

export interface CollectionUpdateInput {
  name: string;
  slug: string;
  id: number;
}

export interface ProductCreateInput {
  title: string;
  slug: string;
  price: number;
  image: string;
  collectionId: number;
}

export interface ProductUpdateInput {
  title: string;
  slug: string;
  price: number;
  image: string;
  collectionId: number;
  id: number;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
