import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import Register from "./Components/UserComponents/RegisterComponents/Register";
import Login from "./Components/UserComponents/LoginComponents/Login";
import OTPVerify from "./Components/UserComponents/RegisterComponents/OTPVerify";
import AddressSetup from "./Components/UserComponents/RegisterComponents/AddressSetup";
import ForgotPassword from "./Components/UserComponents/PasswordRecoveryComponents/ForgotPassword";
import VerifyRecovery from "./Components/UserComponents/PasswordRecoveryComponents/VerifyRecovery";
import ResetPassword from "./Components/UserComponents/PasswordRecoveryComponents/ResetPassword";
import Home from "./Components/UserComponents/HomeComponent/Home";
import "./App.css";

// Create RTL cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});


const theme = createTheme({
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

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <BrowserRouter>
            {/* Permanent Floating Logo */}
            <Link to="/" className="floating-logo-container">
              <img src="/Logo.png" alt="Al-Khairat Logo" className="floating-logo-img" />
            </Link>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<OTPVerify />} />
              <Route path="/address" element={<AddressSetup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-recovery" element={<VerifyRecovery />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* Auth Routes will be added here */}
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
