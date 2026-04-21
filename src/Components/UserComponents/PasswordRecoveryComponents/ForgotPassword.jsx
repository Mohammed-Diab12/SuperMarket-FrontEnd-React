import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Email, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../RegisterComponents/Register.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Professional Email Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 1) Validation
    if (!emailRegex.test(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setLoading(true);

    // 2) Simulate API Delay
    console.log("Requesting reset code for:", email);
    
    setTimeout(() => {
      // Simulate success
      setLoading(false);
      // Move to verify code step
      navigate("/verify-recovery");
    }, 1500);
  };

  return (
    <Box className="auth-container">
      <Box className="auth-form-side">
        <Box className="auth-form-wrapper">
          <Button 
            startIcon={<ArrowForward />} 
            onClick={() => !loading && navigate("/login")}
            disabled={loading}
            sx={{ 
              mb: 2, 
              color: "text.secondary",
              "&.Mui-disabled": { color: "rgba(0,0,0,0.3)" }
            }}
          >
            العودة لتسجيل الدخول
          </Button>
          
          <Typography variant="h4" className="auth-title">
            نسيت كلمة المرور؟
          </Typography>
          <Typography variant="body1" className="auth-subtitle">
            أدخل بريدك الإلكتروني وسنرسل لك رمزاً لإعادة تعيين كلمة المرور
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  minHeight: "56px",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "إرسال الرمز"
                )}
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>

      {/* Image Side */}
      <Box
        className="auth-image-side"
        sx={{ backgroundImage: `url('/login_register.png')` }}
      >
        <Box className="auth-image-content">
          <Box
            component="img"
            src="/Logo.png"
            alt="Logo"
            className="auth-image-logo"
          />
          <Typography className="auth-image-title">سوبر ماركت الخيرات</Typography>
          <Typography className="auth-image-subtitle">
            لا تقلق نساعدك في استعادة حسابك لتستمتع بأفضل المنتجات دائماً
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

