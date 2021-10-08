import {darkModeVar, isLoggedInVar} from "../apollo";
import styled from "styled-components";

const Tilte = styled.h1`
  color: ${props=>props.theme.fontColor};
  
`;

const Container = styled.div`
  background-color: ${props=>props.theme.bgColor};
`;
export default function Login(){
    return (
    <Container>
        <Tilte>Login</Tilte>
    </Container>
    )
}