/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CoffeeshopFragment
// ====================================================

export interface CoffeeshopFragment_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface CoffeeshopFragment_photos_shop {
  __typename: "CoffeeShop";
  id: number;
}

export interface CoffeeshopFragment_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
  shop: CoffeeshopFragment_photos_shop;
}

export interface CoffeeshopFragment_categories {
  __typename: "Category";
  name: string;
  slug: string | null;
}

export interface CoffeeshopFragment {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: CoffeeshopFragment_user;
  photos: (CoffeeshopFragment_photos | null)[] | null;
  categories: (CoffeeshopFragment_categories | null)[] | null;
}
