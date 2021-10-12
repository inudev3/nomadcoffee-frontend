import styled from "styled-components";
import { PropswithChildren } from "../shared";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
const Footer = styled.footer`
  margin-top: 20px;
`;
const DarkModeBtn = styled.span`
  cursor: pointer;
`;
export default function AuthLayout({ children }: PropswithChildren<any>) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}
