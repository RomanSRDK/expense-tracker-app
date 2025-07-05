import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchInfo",
  async (_, ThunkAPI) => {
    try {
      const { data } = await instance.get("users/current");
      // console.log(data);
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
      console.log(data);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);
