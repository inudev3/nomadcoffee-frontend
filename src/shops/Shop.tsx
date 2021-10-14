import {Link} from "react-router-dom";
import {seeCoffeeShops_seeCoffeeShops} from "../__generated__/seeCoffeeShops";
import {gql, useQuery} from "@apollo/client";
import {COFFEESHOP_FRAGMENT} from "../fragments";

type ShopProps = {
    shop: seeCoffeeShops_seeCoffeeShops;
};
export default function Shop({shop}: ShopProps) {
    const {id, photos, user, categories, name, latitude, longitude} = shop;


    return (
        <ShopContainer>
            <ShopHeader>
                <Link to={`/shops/${id}`}>
                    <span>{name}</span>
                </Link>
            </ShopHeader>

            <ShopPhoto src={photos ? [0]}/>
        </ShopContainer>
    );
}
