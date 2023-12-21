import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { displayInfoMessage } from "../utils/notify";
const SignUpSchema = yup.object({
  username: yup.string().required("Username is required"),
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required")
    .nullable(),
});

const SignUp: React.FC = () => {
  const navigateTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      re_password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/users/",
          values
        );
        console.log(response.data);
        displayInfoMessage(
          "Our Team send you and email to activate Your account and Activate It ! and Then continue Login"
        );
        navigateTo("/login");
      } catch (error) {
        console.error("Sign Up Error:", error);
      }
    },
  });

  return (
    <form style={{ margin: "100px" }} onSubmit={formik.handleSubmit}>
      <ToastContainer />
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("username")}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />

      <TextField
        label="First name"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("first_name")}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
      />

      <TextField
        label="Last name"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("last_name")}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("email")}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        label="Password"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("password")}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <TextField
        label="Re Password"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("re_password")}
        error={formik.touched.re_password && Boolean(formik.errors.re_password)}
        helperText={formik.touched.re_password && formik.errors.re_password}
      />

      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
