import React from "react";
import { Box, Typography } from "@mui/material";

const AuthLayout = ({
  children,
  imageTitle,
  imageSubtitle,
  imageSrc = "/login_register.png",
  formWrapperSx = {},
}) => {
  return (
    <Box className="auth-container">
      <Box className="auth-form-side">
        <Box className="auth-form-wrapper" sx={formWrapperSx}>
          {children}
        </Box>
      </Box>

      <Box
        className="auth-image-side"
        sx={{ backgroundImage: `url('${imageSrc}')` }}
      >
        <Box className="auth-image-content">
          <Box
            component="img"
            src="/Logo.png"
            alt="Logo"
            className="auth-image-logo"
          />
          <Typography className="auth-image-title">{imageTitle}</Typography>
          <Typography className="auth-image-subtitle">
            {imageSubtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
