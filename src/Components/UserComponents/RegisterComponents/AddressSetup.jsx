import React, { useState } from "react";
import { Typography, Button, Stack, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../RegisterComponents/Register.css";
import AuthLayout from "../Common/AuthLayout";

const AddressSetup = () => {
  const [address, setAddress] = useState({
    city: "",
    district: "",
    street: "",
    building: "",
  });
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <AuthLayout
      imageTitle="سوبر ماركت الخيرات"
      imageSubtitle="دقة في المواعيد.. سرعة في التوصيل حتى باب منزلك"
      formWrapperSx={{ maxWidth: { xs: "100%", sm: "600px" }, width: "100%" }}
    >
      <Typography variant="h4" className="auth-title">
        أين نسلم طلباتك؟
      </Typography>
      <Typography variant="body1" className="auth-subtitle">
        أضف عنوانك لنتمكن من توصيل أفضل المنتجات إليك بأسرع وقت.
      </Typography>

      <form onSubmit={handleSave}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="المدينة"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="الحي أو المنطقة"
                value={address.district}
                onChange={(e) =>
                  setAddress({ ...address, district: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="الشارع"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="رقم المبنى / تفاصيل إضافية"
                value={address.building}
                onChange={(e) =>
                  setAddress({ ...address, building: e.target.value })
                }
              />
            </Grid>
          </Grid>

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
            حفظ وإنهاء
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={handleSkip}
            sx={{
              mt: 1,
              fontSize: "1rem",
              color: "#7f8c8d",
              textDecoration: "underline",
              "&:hover": { color: "#2c3e50", backgroundColor: "transparent" },
            }}
          >
            تخطي هذه الخطوة (يُمكنك إدخال العنوان لاحقاً)
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default AddressSetup;
