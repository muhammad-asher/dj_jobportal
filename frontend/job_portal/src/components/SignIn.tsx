import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { displaySuccessMessage } from '../utils/notify';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const navigateTo = useNavigate();
  const { control, handleSubmit, formState, setError } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (values) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/create', values);
      console.log(response.data);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      navigateTo('/home');
    } catch (error) {
      console.error('Sign In Error:', error);
      setError('email', { type: 'manual', message: 'Invalid email or password' });
      setError('password', { type: 'manual', message: 'Invalid email or password' });
    }
  };

  return (
    <form style={{ margin: '100px' }} onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Typography variant="h5">Sign In</Typography>
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
        rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
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
        rules={{ required: 'Password is required' }}
      />

      <Button type="submit" variant="contained" color="primary" disabled={formState.isSubmitting}>
        Sign In
      </Button>
    </form>
  );
};

export default SignIn;
