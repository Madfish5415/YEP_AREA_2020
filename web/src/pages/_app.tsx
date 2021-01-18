import { AppProps } from "next/app";
import React from "react";
import { CssBaseline } from "@material-ui/core";

import "../styles/_app.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
};

export default App;
