import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import AuthLayout from "../Common/AuthLayout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    let score = 0;
    if (password.length > 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[a-z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 20;
    if (/[!@#$%^&*]/.test(password)) score += 20;
    setStrength(score);
  }, [password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 3) {
      setError("يرجى إدخال الاسم (3 أحرف على الأقل)");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }
    if (strength < 60) {
      setError("يرجى اختيار كلمة مرور أقوى");
      return;
    }

    setLoading(true);
    setError("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const apiBaseUrl =
        process.env.REACT_APP_API_URL || "http://188.0.121.235:3000/api";
      const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        signal: controller.signal,
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        navigate("/verify");
      } else {
        setError(
          data.message || "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
        );
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setError(
          "انتهت مهلة الاتصال. السيرفر لا يستجيب، يرجى المحاولة لاحقاً.",
        );
      } else {
        console.error("Register Error:", err);
        setError("حدث خطأ في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (strength < 30) return "#e74c3c";
    if (strength < 70) return "#f1c40f";
    return "#2ecc71";
  };

  return (
    <AuthLayout
      imageTitle="سوبر ماركت الخيرات"
      imageSubtitle="نقدم لكم أفضل العروض وأجود المنتجات الطازجة لتناسب ذوقكم الرفيع"
    >
      <Typography variant="h4" className="auth-title">
        إنشاء حساب جديد
      </Typography>
      <Typography variant="body1" className="auth-subtitle">
        انضم إلينا واستمتع بتجربة تسوق مميزة
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleRegister} noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="الاسم"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

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
            <Box className="password-strength-meter">
              <Box
                className="password-strength-bar"
                style={{
                  width: `${strength}%`,
                  backgroundColor: getStrengthColor(),
                }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              قوة كلمة المرور:{" "}
              {strength < 40 ? "ضعيفة" : strength < 80 ? "متوسطة" : "قوية"}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="تأكيد كلمة المرور"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
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
              boxShadow: "0 4px 12px rgba(46, 204, 113, 0.2)",
              textTransform: "none",
              minHeight: "56px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "تسجيل الحساب"
            )}
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            لديك حساب بالفعل؟{" "}
            <Link
              component="button"
              type="button"
              onClick={() => !loading && navigate("/login")}
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                opacity: loading ? 0.6 : 1,
                pointerEvents: loading ? "none" : "auto",
                cursor: loading ? "default" : "pointer",
              }}
            >
              تسجيل الدخول
            </Link>
          </Typography>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default Register;
