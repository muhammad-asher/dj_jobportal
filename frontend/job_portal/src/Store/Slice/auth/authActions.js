import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../../api/apiRequest";


export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { username, first_name, last_name, email, password, re_password },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await apiRequest.post(`api/v1/users/`, { username, first_name, last_name, email, password, re_password }, config);
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/load_user",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      return await apiRequest.get(`api/v1/users/me/`, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchAllUsersData = createAsyncThunk(
  "auth/fetch_user_all_users_Data",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      return await apiRequest.get(`api/v1/users/`, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await apiRequest.post(
        `api/v1/jwt/create`,
        { email, password },
        config
      );
      return response.data; // Assuming the response contains data property
    } catch (error) {
      throw error; // Ensure the rejection is propagated
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async ({ refresh }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await apiRequest.post(
        `api/v1/jwt/refresh/`,
        { refresh },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ refresh }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      return await apiRequest.post(`logout/`, { refresh }, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
