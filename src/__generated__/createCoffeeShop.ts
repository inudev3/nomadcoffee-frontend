/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCoffeeShop
// ====================================================

export interface createCoffeeShop_createCoffeeShop {
  __typename: "MutationResponse";
  ok: boolean;
  id: number | null;
  error: string | null;
}

export interface createCoffeeShop {
  createCoffeeShop: createCoffeeShop_createCoffeeShop;
}

export interface createCoffeeShopVariables {
  name: string;
  latitude: string;
  longitude: string;
  photos?: (any | null)[] | null;
  categories?: (string | null)[] | null;
}
