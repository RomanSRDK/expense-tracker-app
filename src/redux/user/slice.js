import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    name: "",
    avatarUrl: "",
    currency: "",
  },
});

export default slice.reducer;
