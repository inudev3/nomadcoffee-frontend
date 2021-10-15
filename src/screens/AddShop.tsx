import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  createCoffeeShop,
  createCoffeeShopVariables,
} from "../__generated__/createCoffeeShop";
import { useHistory } from "react-router-dom";
import FormError from "../components/auth/FormError";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";

import FormBox from "../components/auth/FormBox";
import styled from "styled-components";
import { FatLink } from "../components/shared";
import routes from "../routes";

type FormProps = {
  name: string;
  latitude: string;
  longitude: string;
  photos: string[];
  categories: string[];
  result?: string;
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;
const Wrapper = styled.div`
  max-width: 650px;
  width: 100%;
`;
const CButton = styled(Button).attrs({
  as: "span",
})``;

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

  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    if (loading) return;

    createCoffeeShop({ variables: { ...data } });
  };
  const { errors } = formState;
  return (
    <Container>
      <Wrapper>
        <FormBox>
          <HeaderContainer>
            <Subtitle>Create a shop</Subtitle>
          </HeaderContainer>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("name", { required: "this field is required" })}
              hasError={Boolean(errors?.name?.message)}
              placeholder="name"
            />
            <FormError message={errors?.name?.message} />
            <Input
              {...register("latitude", { required: "this field is required" })}
              hasError={Boolean(errors?.latitude?.message)}
              placeholder="latitude"
            />
            <FormError message={errors?.latitude?.message} />
            <Input
              {...register("longitude", { required: "this field is required" })}
              hasError={Boolean(errors?.longitude?.message)}
              placeholder="longitude"
            />
            <FormError message={errors?.longitude?.message} />
            <Input
              type="file"
              multiple
              {...register("photos", { required: "this field is required" })}
              placeholder="photos"
            />

            <Input
              multiple
              {...register("categories", {
                required: "this field is required",
              })}
              placeholder="categories"
            />

            <Button
              type="submit"
              value={loading ? "Loading..." : "Create a shop"}
              disabled={!formState.isValid || loading}
            />
            <CButton
              type="button"
              onClick={() => history.push(`${routes.home}`)}
            >
              Cancel
            </CButton>
          </form>
        </FormBox>
      </Wrapper>
    </Container>
  );
}
