import styled from "styled-components";
import { FatLink } from "../components/shared";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox, { Container } from "../components/auth/FormBox";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router-dom";
import routes from "../routes";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import BottomBox from "../components/auth/BottomBox";

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
const SignUpBox = styled(Container)`
  form {
    margin-top: 0px;
  }
`;
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
    $avatarURL: String
    $githubUsername: String
    $location: String
  ) {
    createAccount(
      username: $username
      name: $name
      email: $email
      password: $password
      avatarURL: $avatarURL
      githubUsername: $githubUsername
      location: $location
    ) {
      ok
      error
    }
  }
`;
type FormProps = {
  name: string;
  email: string;
  username: string;
  password: string;
  avatarURL?: string;
  githubUsername?: string;
  location?: string;
  result?: string;
};
export default function SignUp() {
  const history = useHistory();
  const { register, handleSubmit, formState, setError, getValues } =
    useForm<FormProps>({ mode: "onChange" });
  const { username, password } = getValues();
  const [createAccount, { loading, data }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const {
        createAccount: { ok, error },
      } = data;
      if (error) {
        return setError("result", { message: error });
      }
      history.push(routes.home, {
        message: "Account created. Please Login",
        username,
        password,
      });
    },
  });
  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    if (loading) {
      return;
    }
    createAccount({ variables: { ...data } });
  };
  const { errors, isValid } = formState;
  return (
    <AuthLayout>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
          <Subtitle>Sign up to see photos of coffeeshops</Subtitle>
        </HeaderContainer>

        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("name", { required: "this field is required" })}
            hasError={Boolean(errors?.name?.message)}
            placeholder="Name"
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register("email", { required: "this field is required" })}
            hasError={Boolean(errors?.email?.message)}
            placeholder="Email"
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("username", { required: "this field is required" })}
            hasError={Boolean(errors?.username?.message)}
            placeholder="Username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "this field is required" })}
            hasError={Boolean(errors?.password?.message)}
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <Input {...register("avatarURL")} placeholder="avatarURL" />
          <Input
            {...register("githubUsername")}
            placeholder="Github Username"
          />
          <Input {...register("location")} placeholder="Location" />
          <Button
            type="submit"
            value="Sign up"
            disabled={loading || !formState.isValid}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log In" />
    </AuthLayout>
  );
}
