/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UserLogin
// ====================================================

export interface UserLogin_login {
  __typename: "User";
  token: string;
}

export interface UserLogin {
  login: UserLogin_login;
}

export interface UserLoginVariables {
  data: UserLoginInput;
}
