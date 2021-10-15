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
    photos {
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
