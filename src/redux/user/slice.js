import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserInfo,
  removeUsersAvatar,
  setCurrencyAndName,
  updatesAvatar,
} from "./operations";
import { logIn } from "../auth/operations";

const slice = createSlice({
  name: "user",
  initialState: {
    user: { name: "", avatarUrl: "", currency: "" },
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUserInfo.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        const { name, avatarUrl, currency } = action.payload;
        state.user.name = name;
        state.user.avatarUrl = avatarUrl;
        state.user.currency = currency;
      })
      .addCase(updatesAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatesAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(updatesAvatar.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeUsersAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUsersAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.avatarUrl = action.payload?.avatarUrl || null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        const { name, avatarUrl, currency } = payload.user;
        state.user.name = name;
        state.user.avatarUrl = avatarUrl;
        state.user.currency = currency;
      })
      .addCase(setCurrencyAndName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCurrencyAndName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.name = action.payload.name; // или action.payload.user.name
        state.user.currency = action.payload.currency; // или action.payload.user.currency
      })
      .addCase(setCurrencyAndName.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default slice.reducer;
