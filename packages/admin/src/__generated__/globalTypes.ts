/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CollectionInput {
  title: string;
  description?: string | null;
  id?: number | null;
}

export interface ProductInput {
  title: string;
  description?: string | null;
  price: number;
  image: string;
  id?: number | null;
  collectionId?: number | null;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
