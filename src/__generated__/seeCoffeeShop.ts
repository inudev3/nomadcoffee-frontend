/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShop
// ====================================================

export interface seeCoffeeShop_seeCoffeeShop_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface seeCoffeeShop_seeCoffeeShop_photos_shop {
  __typename: "CoffeeShop";
  id: number;
}

export interface seeCoffeeShop_seeCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
  shop: seeCoffeeShop_seeCoffeeShop_photos_shop;
}

export interface seeCoffeeShop_seeCoffeeShop_categories {
  __typename: "Category";
  name: string;
  slug: string | null;
}

export interface seeCoffeeShop_seeCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: seeCoffeeShop_seeCoffeeShop_user;
  photos: (seeCoffeeShop_seeCoffeeShop_photos | null)[] | null;
  categories: (seeCoffeeShop_seeCoffeeShop_categories | null)[] | null;
}

export interface seeCoffeeShop {
  seeCoffeeShop: seeCoffeeShop_seeCoffeeShop | null;
}

export interface seeCoffeeShopVariables {
  id: number;
}
