import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  createCoffeeShop,
  createCoffeeShopVariables,
} from "../__generated__/createCoffeeShop";
import { useHistory } from "react-router-dom";
import FormError from "../components/auth/FormError";

type FormProps = {
  name: string;
  latitude: string;
  longitude: string;
  photos: string[];
  categories: string[];
  result?: string;
};

const CREATECOFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photos: [Upload]
    $categories: [String]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
      categories: $categories
    ) {
      ok
      id
      error
    }
  }
`;
export default function AddShop() {
  const history = useHistory();
  const [createCoffeeShop, { data, loading }] = useMutation<
    createCoffeeShop,
    createCoffeeShopVariables
  >(CREATECOFFEESHOP_MUTATION, {
    onCompleted: (data) => {
      const {
        createCoffeeShop: { ok, error, id },
      } = data;
      if (error) {
        return setError("result", { message: error });
      }
      history.push(`/shop/${id}`);
    },
  });
  const { control, register, handleSubmit, formState, getValues, setError } =
    useForm<FormProps>({ mode: "onChange" });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control, name: "photos" }
  );
  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    if (loading) return;

    createCoffeeShop({ variables: { ...data } });
  };
  const { errors } = formState;
  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <input
        {...register("name", { required: "this field is required" })}
        placeholder="name"
      />
      <FormError message={errors?.name?.message} />
      <input
        {...register("latitude", { required: "this field is required" })}
        placeholder="latitude"
      />
      <FormError message={errors?.latitude?.message} />
      <input
        {...register("longitude", { required: "this field is required" })}
        placeholder="longitude"
      />
      <FormError message={errors?.longitude?.message} />
      <input
        type="file"
        {...register("photos", { required: "this field is required" })}
        placeholder="photos"
      />
      <FormError message={errors?.photos?.message} />
      <input
        {...register("categories", { required: "this field is required" })}
        placeholder="categories"
      />
      <FormError message={errors?.categories?.message} />
    </form>
  );
}
