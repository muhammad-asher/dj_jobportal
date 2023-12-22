import { createSlice } from "@reduxjs/toolkit";
import {
  loadUser,
  registerUser,
  userLogin,
  fetchAllUsersData,
  logout,
} from "./authActions";

const access = localStorage.getItem("access")
  ? localStorage.getItem("access")
  : null;
const refresh = localStorage.getItem("refresh")
  ? localStorage.getItem("refresh")
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access,
    refresh,
    isAuthenticated: false,
    isVerified: false,
    loading: false,
    currentUserInfo: {},
    allUsersInfo: {},
    error: null,
  },
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.currentUserInfo = payload;
    },
  },
  extraReducers: {
    // load user data
    [loadUser.pending]: (state) => {
      state.loading = true;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.currentUserInfo = payload.data;
      state.loading = false;
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Fetch All Users Data
    [fetchAllUsersData.pending]: (state) => {
      state.loading = true;
    },
    [fetchAllUsersData.fulfilled]: (state, { payload }) => {
      state.allUsersInfo = payload.data;
      state.loading = false;
    },
    [fetchAllUsersData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // login user
    [userLogin.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      localStorage.setItem("access", payload.data.access);
      localStorage.setItem("refresh", payload.data.refresh);

      state.access = payload.data.access;
      state.refresh = payload.data.refresh;
      state.isAuthenticated = true;
      state.isVerified = true;
      state.loading = false;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      localStorage.setItem("access", payload.data.access);
      localStorage.setItem("refresh", payload.data.refresh);

      state.access = payload.data.access;
      state.refresh = payload.data.refresh;
      state.isAuthenticated = true;
      state.isVerified = false;
      state.loading = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Logout
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.isVerified = false;
      state.loading = false;
      state.currentUserInfo = {};
      state.error = null;
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;
