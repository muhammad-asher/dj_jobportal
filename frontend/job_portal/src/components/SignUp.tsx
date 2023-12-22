import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { displayErrorMessage, displayInfoMessage } from "../utils/notify";

type SignUpFormData = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
};

const SignUp: React.FC = () => {
  const navigateTo = useNavigate();
  const { control, handleSubmit, formState, setError, getValues } = useForm<SignUpFormData>({
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/",
        values
      );
      console.log(response.data);
      displayInfoMessage(
        "Our Team send you an email to activate your account. Activate it and then continue to login."
      );
      navigateTo("/login");
    } catch (error:any) {
      console.error("Sign Up Error:", error);
      displayErrorMessage(error);
    }
  };

  return (
    <form style={{ margin: "100px" }} onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Typography variant="h5">Sign Up</Typography>
      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
        name="username"
        control={control}
        rules={{ required: "Username is required" }}
      />

<Controller
        render={({ field, fieldState }) => (
          <TextField
            label="First name"
            fullWidth
            margin="normal"
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
        name="first_name"
        control={control}
        rules={{ required: "First Name is required" }}
      />

      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label="Last name"
            fullWidth
            margin="normal"
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
        name="last_name"
        control={control}
        rules={{ required: "Last Name is required" }}
      />

      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
        name="email"
        control={control}
        rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
      />

      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
        name="password"
        control={control}
        rules={{ required: "Password is required" }}
      />

      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label="Re Password"
            fullWidth
            margin="normal"
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
        name="re_password"
        control={control}
        rules={{
          required: "Confirm Password is required",
          validate: (value) => value === getValues().password || "Passwords must match",
        }}
      />

      <Button type="submit" variant="contained" color="primary" disabled={formState.isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
