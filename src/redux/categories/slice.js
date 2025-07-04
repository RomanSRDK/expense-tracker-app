import { createSlice } from "@reduxjs/toolkit";
import { deleteCategory, getCategories } from "./operations";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesList: [],
    isLoading: false,
    error: null,
    selectedCategory: "",
  },
  reducers: {
    setCategory(state, { payload }) {
      state.selectedCategory = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        (state.isLoading = false),
          (state.error = null),
          (state.categoriesList = payload);
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        (state.isLoading = false), (state.error = payload);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const { id, type } = payload;

        if (type && id && state.categoriesList[type]) {
          state.categoriesList[type] = state.categoriesList[type].filter(
            (category) => category._id !== id
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { setCategory } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
