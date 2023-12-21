// src/components/LandingPage.tsx
import React from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "./Navbar";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Container style={{margin:"100px"}}>
        <Typography variant="h1">Landing Page</Typography>
        <Typography variant="h3">Job Portal Application</Typography>
      </Container>
    </div>
  );
}

export default LandingPage;
