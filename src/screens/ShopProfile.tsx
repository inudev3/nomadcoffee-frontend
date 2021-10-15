import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { COFFEESHOP_FRAGMENT } from "../fragments";
import {
  editCoffeeShop,
  editCoffeeShopVariables,
} from "../__generated__/editCoffeeShop";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { seeCoffeeShop } from "../__generated__/seeCoffeeShop";
import Shop from "../shops/Shop";
import FormError from "../components/auth/FormError";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";

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
type FormProps = {
  name: string;
  latitude: string;
  longitude: string;
  photos: string[];
  categories: string[];
};
export default function ShopProfile() {
  const [edit, setEdit] = useState(true);
  const { id } = useParams<ShopProfileParams>();
  const shopId = parseInt(id);
  const { data, loading } = useQuery<seeCoffeeShop>(SEECOFFEESHOP_QUERY);

  const [editCoffeeShop, { loading: editLoading }] = useMutation<
    editCoffeeShop,
    editCoffeeShopVariables
  >(EDIT_COFFEESHOP_MUTATION);
  const [deleteCoffeeShop, { loading: deleteLoading }] = useMutation(
    DELETE_COFFEESHOP_MUTATION,
    { variables: { id: shopId } }
  );
  const { register, handleSubmit, formState, setError, getValues } =
    useForm<FormProps>();
  const {
    seeCoffeeShop: { photos, user, categories, name, latitude, longitude },
  } = data as any;
  const { errors } = formState;
  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    editCoffeeShop({ variables: { id: shopId, ...data } });
  };
  return (
    <>
      <div>
        <PageTitle
          title={
            loading ? "Loading..." : `${data?.seeCoffeeShop?.name}'s Profile`
          }
        />
      </div>
      {edit ? (
        <AuthLayout>
          <FormBox>
            <form onSubmit={handleSubmit(onSubmitValid)}>
              <Input
                {...register("name")}
                placeholder="name"
                hasError={Boolean(errors?.name?.message)}
              />
              <FormError message={errors?.name?.message} />
              <Input
                {...register("latitude")}
                placeholder="latitude"
                hasError={Boolean(errors?.latitude?.message)}
              />
              <FormError message={errors?.latitude?.message} />
              <Input
                {...register("longitude")}
                placeholder="longitude"
                hasError={Boolean(errors?.longitude?.message)}
              />
              <FormError message={errors?.longitude?.message} />
              <Input {...register("categories")} placeholder="categories" />

              <Button
                onClick={() => setEdit(false)}
                type="button"
                value="cancel"
              />
              <Button
                type="submit"
                value={loading ? "Looading..." : "Sign Up"}
                disabled={!formState.isValid || loading}
              />
            </form>
          </FormBox>
        </AuthLayout>
      ) : (
        <div></div>
      )}
    </>
  );
}
