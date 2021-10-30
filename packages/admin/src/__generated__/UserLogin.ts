/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UserLogin
// ====================================================

export interface UserLogin_userLogin {
  __typename: "User";
  token: string;
  email: string;
}

export interface UserLogin {
  userLogin: UserLogin_userLogin;
}

export interface UserLoginVariables {
  data: UserLoginInput;
}
