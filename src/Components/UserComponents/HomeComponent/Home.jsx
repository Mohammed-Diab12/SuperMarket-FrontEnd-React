import React from "react";
import { Box, IconButton, Tooltip, Typography, Container } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header / Navbar Placeholder */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        {/* Placeholder for the permanent floating logo */}
        <Box sx={{ width: "140px", height: "40px" }} />

        <Tooltip title="المستخدم">
          <IconButton onClick={() => navigate("/login")} size="large" color="primary">
            <AccountCircle sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Main Content Placeholder */}
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontFamily: "Cairo", fontWeight: "700", mb: 2 }}>
          أهلاً بك في متجرنا
        </Typography>
        <Typography variant="h5" color="text.secondary">
          هذه الصفحة قيد الإنشاء.. قريباً ستجد أفضل العروض هنا.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
