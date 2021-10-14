import useUser from "../hooks/useUser";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderMenu = styled.span`
  margin-left: 15px;
  font-size: 15px;
`;
const Button = styled.span`
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

export default function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faCoffee} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <HeaderMenu>Add a Shop</HeaderMenu>
              <HeaderMenu>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatarURL} />
                </Link>
              </HeaderMenu>
              <HeaderMenu>Logout</HeaderMenu>
            </>
          ) : (
            <Link to={routes.home}>
              <Button>Log In</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
