import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../RegisterComponents/Register.css";

const VerifyRecovery = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");
    
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("يرجى إدخال الرمز كاملاً");
      return;
    }

    setLoading(true);

    // Simulate API logic
    setTimeout(() => {
        console.log("Verifying Recovery OTP:", otpValue);
        setLoading(false);
        navigate("/reset-password");
    }, 1500);
  };

  return (
    <Box className="auth-container">
      <Box className="auth-form-side">
        <Box className="auth-form-wrapper" sx={{ textAlign: "center" }}>
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Button 
                startIcon={<ArrowForward />} 
                onClick={() => !loading && navigate("/forgot-password")}
                disabled={loading}
                sx={{ 
                  color: "text.secondary",
                  "&.Mui-disabled": { color: "rgba(0,0,0,0.3)" }
                }}
            >
                العودة
            </Button>
          </Box>
          
          <Typography variant="h4" className="auth-title">
            تحقق من الرمز
          </Typography>
          <Typography variant="body1" className="auth-subtitle">
            أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleVerify} noValidate>
            <Stack spacing={4}>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, direction: "ltr" }}>
                {otp.map((data, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    variant="outlined"
                    disabled={loading}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        width: "45px",
                        height: "45px",
                        padding: "10px",
                      },
                    }}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
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
                  minHeight: "56px",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "تأكيد الرمز"
                )}
              </Button>

              <Typography variant="body2">
                لم يصلك الرمز؟{" "}
                <Link 
                  component="button" 
                  type="button"
                  onClick={() => !loading && console.log("Resending...")} 
                  disabled={loading}
                  sx={{ 
                    fontWeight: "bold",
                    opacity: loading ? 0.6 : 1,
                    pointerEvents: loading ? "none" : "auto"
                  }}
                >
                  إعادة إرسال
                </Link>
              </Typography>
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
            خطوة واحدة تفصلك عن استعادة الوصول لحسابك
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyRecovery;

