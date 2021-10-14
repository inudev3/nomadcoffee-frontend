import {useParams} from "react-router-dom";
import {gql, useMutation, useQuery} from "@apollo/client";
import {COFFEESHOP_FRAGMENT} from "../fragments";
import {
    editCoffeeShop,
    editCoffeeShopVariables,
} from "../__generated__/editCoffeeShop";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {seeCoffeeShop} from "../__generated__/seeCoffeeShop";
import Shop from "../shops/Shop";

type ShopProfileParams = {
    id: string;
};
const EDIT_COFFEESHOP_MUTATION = gql`
    mutation editCoffeeShop(
        $id: Int!
        $name: String
        $latitude: String
        $longitude: String
        $categories: [String]
    ) {
        editCoffeeShop(
            id: $id
            name: $name
            latitude: $latitude
            longitude: $longitude
            categories: $categories
        ) {
            ok
            id
            error
        }
    }
`;
const DELETE_COFFEESHOP_MUTATION = gql`
    mutation deleteCoffeeShop($id: Int!) {
        deleteCoffeeShop(id: $id) {
            ok
            error
        }
    }
`;


const SEECOFFEESHOP_QUERY = gql`
    query seeCoffeeShop($id: Int!) {
        seeCoffeeShop(id: $id) {
            ...CoffeeshopFragment
        }
    }
    ${COFFEESHOP_FRAGMENT}
`;


export default function ShopProfile() {
    const [edit, setEdit] = useState(false);
    const {id} = useParams<ShopProfileParams>();
    const shopId = parseInt(id);
    const {data, loading} = useQuery<seeCoffeeShop>(SEECOFFEESHOP_QUERY);

    const [editCoffeeShop, {loading: editLoading,}] = useMutation<editCoffeeShop,
        editCoffeeShopVariables>(EDIT_COFFEESHOP_MUTATION);
    const [deleteCoffeeShop, {loading: deleteLoading}] = useMutation(
        DELETE_COFFEESHOP_MUTATION, {variables: {id: shopId}}
    );
    const {register, handleSubmit, formState, setError, getValues} = useForm();
    const {seeCoffeeShop: {photos, user, categories, name, latitude, longitude}} = data as any;

    return (
        {
            edit?
                <form>
                    <input {...register("name")} placeholder="name"/>
                    <input {...register("latitude")} placeholder="latitude"/>
                    <input {...register("longitude")} placeholder="longitude"/>
                    <input {...register("categories")} placeholder="categories"/>
                </form>
                : <Shop shop={data?.seeCoffeeShop}/>
        }
    );
}
