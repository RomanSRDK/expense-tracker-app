import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
});

// Utility to add / remove JWT
export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

const saveTokensToStorage = (data) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("sid", data.sid);
};

const clearTokensFromStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("sid");
};

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
      setAuthHeader(res.data.accessToken);
      saveTokensToStorage(res.data);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 400) {
        return thunkAPI.rejectWithValue(
          "Access is prohibited: Incorrect password or login"
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/register
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      await instance.post("/auth/register", credentials);

      const data = await thunkAPI
        .dispatch(
          logIn({
            email: credentials.email,
            password: credentials.password,
          })
        )
        .unwrap();
      return data;
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 409) {
        return thunkAPI.rejectWithValue(
          "Invalid request body  or Provided email already exists"
        );
      }
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
    const state = thunkAPI.getState();
    const refreshToken =
      state.auth.refreshToken || localStorage.getItem("refreshToken");
    const sid = state.auth.sid || localStorage.getItem("sid");

    if (!refreshToken || !sid) {
      return thunkAPI.rejectWithValue("No session info for refresh");
    }

    try {
      const res = await axios.post(
        "https://expense-tracker.b.goit.study/api/auth/refresh",
        { sid },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      if (res.data.accessToken) {
        setAuthHeader(res.data.accessToken);
        return res.data;
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      clearAuthHeader();
      clearTokensFromStorage();
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token || localStorage.getItem("accessToken");
    setAuthHeader(token);
    await instance.get("/auth/logout");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
    clearTokensFromStorage();
    return { success: true };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
