import React from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { useReactiveVar, ApolloProvider } from "@apollo/client";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Notfound from "./screens/Notfound";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import ShopProfile from "./screens/ShopProfile";
import Layout from "./components/Layout";
import AddShop from "./screens/AddShop";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route>
                <Notfound />
              </Route>
              <Route path={`/add`}>
                <Layout>
                  <AddShop />
                </Layout>
              </Route>
              <Route path={`/shop/:id`}>
                <ShopProfile />
              </Route>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
