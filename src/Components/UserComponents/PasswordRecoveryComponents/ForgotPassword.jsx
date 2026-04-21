import React, { useState } from "react";
import {
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
import AuthLayout from "../Common/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/verify-recovery");
    }, 1500);
  };

  return (
    <AuthLayout
      imageTitle="سوبر ماركت الخيرات"
      imageSubtitle="لا تقلق نساعدك في استعادة حسابك لتستمتع بأفضل المنتجات دائماً"
    >
      <Button
        startIcon={<ArrowForward />}
        onClick={() => !loading && navigate("/login")}
        disabled={loading}
        sx={{
          mb: 2,
          color: "text.secondary",
          "&.Mui-disabled": { color: "rgba(0,0,0,0.3)" },
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
    </AuthLayout>
  );
};

export default ForgotPassword;
