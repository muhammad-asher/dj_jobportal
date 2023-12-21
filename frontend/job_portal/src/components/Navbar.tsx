// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import axios from "axios";
import { displayInfoMessage } from "../utils/notify";

const navbarStyles: React.CSSProperties = {
  width: "100%",
  backgroundColor: "grey",
  border: "1px solid green",
};

const Navbar: React.FC = () => {
  const navigateTo = useNavigate();

  const [userToken, setUserToken] = useState(localStorage.getItem("access"));

  useEffect(() => {
    setUserToken(localStorage.getItem("access"));
  }, [localStorage.getItem("access")]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/logout/",
        { refresh: localStorage.getItem("refresh") },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
        }
      );

      console.log(response.data);
      displayInfoMessage(response.data.detail)
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigateTo("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };


  const handleLoginClick = () => {
    navigateTo("/login");
  };

  const handleRegisterClick = () => {
    navigateTo("/signup");
  };

  return (
    <AppBar sx={navbarStyles}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Job Portal
          </Typography>
          {userToken ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
              <Button color="inherit" onClick={handleRegisterClick}>
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
