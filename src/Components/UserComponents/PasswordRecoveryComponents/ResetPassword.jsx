import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../RegisterComponents/Register.css";
import AuthLayout from "../Common/AuthLayout";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 1500);
  };

  return (
    <AuthLayout
      imageTitle="سوبر ماركت الخيرات"
      imageSubtitle="سلامة حسابك تهمنا.. اختر كلمة مرور يصعب تخمينها"
    >
      <Typography variant="h4" className="auth-title">
        كلمة مرور جديدة
      </Typography>
      <Typography variant="body1" className="auth-subtitle">
        قم بتعيين كلمة مرور قوية وجديدة لحسابك
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
          تم تغيير كلمة المرور بنجاح! يتم توجيهك الآن...
        </Alert>
      )}

      <form onSubmit={handleReset} noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="كلمة المرور الجديدة"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading || success}
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
                    disabled={loading || success}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="تأكيد كلمة المرور"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading || success}
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
            disabled={loading || success}
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
              "تحديث كلمة المرور"
            )}
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
