import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/UserComponents/RegisterComponents/Register";
import Login from "./Components/UserComponents/LoginComponents/Login";
import OTPVerify from "./Components/UserComponents/RegisterComponents/OTPVerify";
import AddressSetup from "./Components/UserComponents/RegisterComponents/AddressSetup";
import ForgotPassword from "./Components/UserComponents/PasswordRecoveryComponents/ForgotPassword";
import VerifyRecovery from "./Components/UserComponents/PasswordRecoveryComponents/VerifyRecovery";
import ResetPassword from "./Components/UserComponents/PasswordRecoveryComponents/ResetPassword";
import Home from "./Components/UserComponents/HomeComponent/Home";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/verify" element={<OTPVerify />} />
    <Route path="/address" element={<AddressSetup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/verify-recovery" element={<VerifyRecovery />} />
    <Route path="/reset-password" element={<ResetPassword />} />
  </Routes>
);

export default AppRoutes;
