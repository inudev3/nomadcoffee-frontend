import { Link } from "react-router-dom";
import { seeCoffeeShops_seeCoffeeShops } from "../__generated__/seeCoffeeShops";
import { gql, useQuery } from "@apollo/client";
import { COFFEESHOP_FRAGMENT } from "../fragments";
import styled from "styled-components";

type ShopProps = {
  shop: seeCoffeeShops_seeCoffeeShops;
};
const ShopContainer = styled.div`
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
  background-color: white;
`;
const ShopHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 15px;
`;
const ShopPhoto = styled.img`
  min-width: 100%;

  border-color: ${(props) => props.theme.borderColor};
`;
const Category = styled.span`
  position: absolute;
  opacity: 0.6;
  font-size: 13px;
  margin: 0px 5px;
  color: ${(props) => props.theme.fontColor};
`;
export default function Shop({ shop }: ShopProps) {
  const { id, photos, user, categories, name, latitude, longitude } = shop;

  return (
    <ShopContainer>
      <ShopHeader>
        <Link to={`/shops/${id}`}>
          <span>{name}</span>
        </Link>
      </ShopHeader>
      <ShopPhoto src={photos ? photos[0]?.url : undefined} />
      {categories?.map((category) => (
        <Category>{category?.name}</Category>
      ))}
    </ShopContainer>
  );
}
