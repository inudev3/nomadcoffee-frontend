import { darkModeVar, isLoggedInVar, logUserIn } from "../apollo";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { BaseBox } from "../components/shared";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import PageTitle from "../components/PageTitle";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const FacebookLogin = styled.div`
  color: #385285;

  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
const Notification = styled.div`
  color: #2ecc71;
`;

type FormProps = {
  username: string;
  password: string;
  result?: string;
};
type LocationProps = {
  username?: string;
  password?: string;
  message?: string;
};

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login() {
  const location = useLocation<LocationProps>();
  const { register, handleSubmit, formState, getValues, setError } =
    useForm<FormProps>({
      defaultValues: {
        username: location?.state?.username || "",
        password: location?.state?.password || "",
      },
      mode: "onChange",
    });

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        const {
          login: { ok, error, token },
        } = data;
        if (error) {
          return setError("result", {
            message: error,
          });
        }
        if (token) {
          logUserIn(token);
        }
      },
    }
  );
  const { username, password } = getValues();
  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    if (loading) {
      return;
    }
    login({ variables: { username, password } });
  };
  const { errors } = formState;
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", { required: "username is required" })}
            hasError={Boolean(errors?.username?.message)}
            placeholder="username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              minLength: {
                value: 4,
                message: "password should be longer than 4 characters",
              },
              required: "password is required",
            })}
            hasError={Boolean(errors?.password?.message)}
            placeholder="password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator>OR</Separator>
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign Up"
      />
    </AuthLayout>
  );
}
