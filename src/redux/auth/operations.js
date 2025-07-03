import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
});

//  Test
//  some@gmail.com
//  qwer1234

// Utility to add JWT
const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/*
 * POST @ /auth/register
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await instance.post("/auth/register", credentials);
      // After successful registration, add the token to the HTTP header
      console.log(" Server response:", res.data);
      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await instance.post("/auth/login", credentials);
      // After successful login, add the token to the HTTP header
      const newToken = res.data.accessToken;
      setAuthHeader(newToken);
      console.log("New token from server:", newToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * GET @ /auth/refresh
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const refreshToken = state.auth.refreshToken;
    const sid = state.auth.sid;

    if (!refreshToken || !sid) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("No session info for refresh");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(refreshToken);
      const res = await instance.post("/auth/refresh", { sid });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
