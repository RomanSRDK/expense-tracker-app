import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "./operations";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesList: [],
    isLoading: false,
    error: null,
    selectedCategory: [],
    categotyToEdit: null,
  },
  reducers: {
    setCategory(state, { payload }) {
      state.selectedCategory = payload;
    },
    clearCategory(state) {
      state.selectedCategory = [];
    },
    setEditCategory(state, { payload }) {
      state.categotyToEdit = payload;
    },
    cancelEditCategory(state) {
      state.categotyToEdit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.categoriesList = payload;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
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
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.categoriesList[payload.type].push(payload);
      })
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const categoriesArray = state.categoriesList[payload.type];
        const categoryIndex = categoriesArray.findIndex(
          (category) => category._id === payload._id
        );
        categoriesArray[categoryIndex].categoryName = payload.categoryName;
        state.categotyToEdit = null;
      })
      .addCase(editCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.categotyToEdit = null;
      });
  },
});

export const {
  setCategory,
  setEditCategory,
  cancelEditCategory,
  clearCategory,
  setSelectedCategoryType,
  clearSelectedCategoryType,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
