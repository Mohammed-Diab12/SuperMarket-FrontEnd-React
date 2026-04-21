import React, { useState } from "react";
import {
  Box,
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

    // Simulate API logic
    setTimeout(() => {
        console.log("Password reset successfully");
        setSuccess(true);
        setLoading(false);
        // After success, navigate to login after a delay
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }, 1500);
  };

  return (
    <Box className="auth-container">
      <Box className="auth-form-side">
        <Box className="auth-form-wrapper">
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
            سلامة حسابك تهمنا.. اختر كلمة مرور يصعب تخمينها
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
