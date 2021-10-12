import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "#2c2c2c",
  bgColor: "white",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
};
export const darkTheme: DefaultTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
};
export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
    all: unset;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.fontColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;

  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
