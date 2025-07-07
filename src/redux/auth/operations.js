import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
});

//  Test
//  some@gmail.com
//  qwer1234

// Utility to add JWT
export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
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
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const refreshToken = state.auth.refreshToken;
    const sid = state.auth.sid;

    if (!refreshToken || !sid) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("No session info for refresh");
    }
    // try {
    //   // If there is a token, add it to the HTTP header and perform the request
    //   setAuthHeader(refreshToken);
    //   const res = await instance.post("/auth/refresh", { sid });
    //   setAuthHeader(res.data.accessToken);
    //   return res.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.message);
    // }

    try {
      // Створюємо окремий запит без використання instance
      const res = await axios.post(
        "https://expense-tracker.b.goit.study/api/auth/refresh",
        { sid },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`, // Використовуємо refreshToken
          },
        }
      );

      // Встановлюємо новий accessToken
      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      // Очищаємо токен при помилці
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.message);
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
    const token = state.auth.token;
    setAuthHeader(token);
    await instance.get("/auth/logout");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
