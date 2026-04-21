import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const appTheme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#2ecc71",
      dark: "#27ae60",
      light: "#eafaf1",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
    },
  },
  typography: {
    fontFamily: ["Almarai", "Cairo", "sans-serif"].join(","),
  },
});
