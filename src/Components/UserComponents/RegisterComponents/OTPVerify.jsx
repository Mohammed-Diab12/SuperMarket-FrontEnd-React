import React, { useState, useRef } from "react";
import { Box, Typography, Button, Stack, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../RegisterComponents/Register.css";
import AuthLayout from "../Common/AuthLayout";

const OTPVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
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
    navigate("/address");
  };

  return (
    <AuthLayout
      imageTitle="سوبر ماركت الخيرات"
      imageSubtitle="أمان حسابك أولويتنا.. خطوة واحدة وتصلك أفضل المنتجات"
      formWrapperSx={{ textAlign: "center" }}
    >
      <Typography variant="h4" className="auth-title">
        التحقق من الحساب
      </Typography>
      <Typography variant="body1" className="auth-subtitle">
        تم إرسال رمز التحقق إلى بريدك الإلكتروني. يرجى إدخاله هنا.
      </Typography>

      <form onSubmit={handleVerify}>
        <Stack spacing={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              direction: "ltr",
            }}
          >
            {otp.map((data, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                variant="outlined"
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
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
            }}
          >
            تحقق الآن
          </Button>

          <Typography variant="body2">
            لم يصلك الكود؟{" "}
            <Link
              component="button"
              onClick={() => navigate("/forgot-password")}
              sx={{ fontWeight: "bold" }}
            >
              إعادة إرسال
            </Link>
          </Typography>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default OTPVerify;
