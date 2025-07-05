import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";
import { setAuthHeader } from "../auth/operations";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchInfo",
  async (_, ThunkAPI) => {
    try {
      const { data } = await instance.get("users/current");
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const updatesAvatar = createAsyncThunk(
  "user/updatesAvatar",
  async (formData, ThunkAPI) => {
    try {
      const { data } = await instance.patch("users/avatar", formData);
      setAuthHeader(data.accessToken);
      console.log(data);

      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);
