import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Stack,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import AuthLayout from "../Common/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح (مثال: user@example.com)");
      return;
    }

    setLoading(true);
    setError("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const apiBaseUrl =
        process.env.REACT_APP_API_URL || "http://188.0.121.235:3000/api";
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        }

        navigate("/");
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setError(
          "انتهت مهلة الاتصال. السيرفر لا يستجيب، يرجى المحاولة لاحقاً.",
        );
      } else {
        console.error("Login Error:", err);
        setError("حدث خطأ في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      imageTitle="سوبر ماركت الخيرات"
      imageSubtitle="أهلاً بكم مجدداً! تسوق بذكاء ووفر أكثر مع عروضنا الحصرية"
    >
      <Typography variant="h4" className="auth-title">
        تسجيل الدخول
      </Typography>
      <Typography variant="body1" className="auth-subtitle">
        مرحباً بك مجدداً! يسعدنا رؤيتك مرة أخرى
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleLogin} noValidate>
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

          <Box>
            <TextField
              fullWidth
              label="كلمة المرور"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
              }
              label={<Typography variant="body2">تذكرني</Typography>}
            />
            <Link
              component="button"
              type="button"
              onClick={() => !loading && navigate("/forgot-password")}
              sx={{
                fontSize: "0.85rem",
                textDecoration: "none",
                opacity: loading ? 0.6 : 1,
                pointerEvents: loading ? "none" : "auto",
                cursor: loading ? "default" : "pointer",
              }}
            >
              نسيت كلمة المرور؟
            </Link>
          </Box>

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
              boxShadow: "0 4px 12px rgba(46, 204, 113, 0.2)",
              textTransform: "none",
              minHeight: "56px",
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "دخول"}
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            ليس لديك حساب؟{" "}
            <Link
              component="button"
              type="button"
              onClick={() => !loading && navigate("/register")}
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                opacity: loading ? 0.6 : 1,
                pointerEvents: loading ? "none" : "auto",
                cursor: loading ? "default" : "pointer",
              }}
            >
              أنشئ حساباً الآن
            </Link>
          </Typography>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default Login;
