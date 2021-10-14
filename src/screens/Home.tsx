import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { COFFEESHOP_FRAGMENT } from "../fragments";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../__generated__/seeCoffeeShops";
import useUser from "../hooks/useUser";
import PageTitle from "../components/PageTitle";
import Shop from "../shops/Shop";

export const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      ...CoffeeshopFragment
    }
  }
  ${COFFEESHOP_FRAGMENT}
`;

export default function Home() {
  const history = useHistory();

  const { data, loading } = useQuery<seeCoffeeShops>(SEECOFFEESHOPS_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeCoffeeShops?.map(
        (shop) => shop && <Shop key={shop.id} shop={shop} />
      )}
    </div>
  );
}
