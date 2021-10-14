import { gql } from "@apollo/client";

export const COFFEESHOP_FRAGMENT = gql`
  fragment CoffeeshopFragment on CoffeeShop {
    id
    name
    latitude
    longitude
    user {
      username
      avatarURL
    }
    photos(page: 1) {
      id
      url
      shop {
        id
      }
    }
    categories {
      name
      slug
    }
  }
`;
