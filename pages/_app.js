import * as React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../config/theme";
import dynamic from "next/dynamic";
import createEmotionCache from "../config/createEmotionCache";
import Layout from "../components/Layout";
import Login from "./Login.js";
import { Alert } from "../components/Alert";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";
import Cookies from "js-cookie";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function Document(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [isAdminLogin, setAdminLogin] = useState(false);
  const [isEmployeeLogin, setEmployeeLogin] = useState(false);
  useEffect(() => {
    if (props.isAdmin) {
      setAdminLogin(props.isAdmin);
    }
    if (props.isEmployee) {
      setEmployeeLogin(props.isEmployee);
    }
  }, []);

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            rel="stylesheet"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAdminLogin || isEmployeeLogin ? (
            <Layout>
              <NextNProgress color="#FFD831" />
              <Alert />
              <Component {...pageProps} />
            </Layout>
          ) : (
            <>
              <Login
                setEmployeeLogin={setEmployeeLogin}
                setAdminLogin={setAdminLogin}
              />
            </>
          )}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
Document.getInitialProps = async (context) => {
  if (context.ctx.req) {
    let allCookies = context.ctx.req.cookies;
    if (
      allCookies &&
      allCookies.EmployeeLoggedIn &&
      allCookies.EmployeeLoggedIn === "true"
    ) {
      return { isEmployee: "true" };
    } else if (
      allCookies &&
      allCookies.AdminLoggedIn &&
      allCookies.AdminLoggedIn === "true"
    ) {
      return {
        isAdmin: "true",
      };
    }
  } else {
    console.log("I am running");
  }
  return {};
};
