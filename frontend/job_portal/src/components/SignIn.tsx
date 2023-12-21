import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button,Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const SignInSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignIn: React.FC = () => {
  const navigateTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/create', values);
        console.log(response.data);
        localStorage.setItem("access",response.data.access)
        localStorage.setItem("refresh",response.data.refresh)
        navigateTo("/home");
      } catch (error) {
        console.error('Sign In Error:', error);
      }
    },
  });

  return (
    <form style={{margin:"100px"}} onSubmit={formik.handleSubmit}>
      <ToastContainer />
      <Typography variant="h5">Sign In</Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('email')}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        label="Password"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('password')}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      {/* Repeat similar TextField component for the password */}

      <Button type="submit" variant="contained" color="primary">
        Sign In
      </Button>
    </form>
  );
};

export default SignIn;
