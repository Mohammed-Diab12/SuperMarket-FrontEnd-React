import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme, cacheRtl } from "./theme/appTheme";

const AppProviders = ({ children }) => (
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  </CacheProvider>
);

export default AppProviders;
