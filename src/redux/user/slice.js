import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, updatesAvatar } from "./operations";

const slice = createSlice({
  name: "user",
  initialState: {
    user: { name: "", avatarUrl: "", currency: "" },
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        const { name, avatarUrl, currency } = action.payload;
        state.user.name = name;
        state.user.avatarUrl = avatarUrl;
        state.user.currency = currency;
      })
      .addCase(updatesAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.avatarUrl = action.payload.avatarUrl;
      });
  },
});

export default slice.reducer;
