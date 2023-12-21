// src/components/Applications.tsx
import React from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "./Navbar";

const Applications: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Container style={{margin:"100px"}}>
        <Typography variant="h1">Applications Page</Typography>
        <Typography variant="h3">Applications</Typography>
      </Container>
    </div>
  );
}

export default Applications;
