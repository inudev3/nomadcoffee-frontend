/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShops
// ====================================================

export interface seeCoffeeShops_seeCoffeeShops_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface seeCoffeeShops_seeCoffeeShops_photos_shop {
  __typename: "CoffeeShop";
  id: number;
}

export interface seeCoffeeShops_seeCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
  shop: seeCoffeeShops_seeCoffeeShops_photos_shop;
}

export interface seeCoffeeShops_seeCoffeeShops_categories {
  __typename: "Category";
  name: string;
  slug: string | null;
}

export interface seeCoffeeShops_seeCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: seeCoffeeShops_seeCoffeeShops_user;
  photos: (seeCoffeeShops_seeCoffeeShops_photos | null)[] | null;
  categories: (seeCoffeeShops_seeCoffeeShops_categories | null)[] | null;
}

export interface seeCoffeeShops {
  seeCoffeeShops: (seeCoffeeShops_seeCoffeeShops | null)[] | null;
}

export interface seeCoffeeShopsVariables {
  lastId?: number | null;
}
