import React from 'react';
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import {useReactiveVar} from "@apollo/client";
import {darkModeVar, isLoggedInVar} from "./apollo";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Notfound from "./screens/Notfound";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme, GlobalStyles} from "./styles";




function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);
  return (
        <ThemeProvider theme={darkMode? darkTheme:lightTheme}>
            <GlobalStyles/>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn? <Home/>:<Login/>}
                </Route>
                <Route>
                    <Notfound/>
                </Route>
            </Switch>
        </BrowserRouter>
        </ThemeProvider>
  );
}

export default App;
