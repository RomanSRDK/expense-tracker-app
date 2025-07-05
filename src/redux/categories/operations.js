import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const getCategories = createAsyncThunk(
  "categories/get",
  async (_, { rejectWithVaue }) => {
    try {
      const { data } = await instance.get("/categories");
      return data;
    } catch (error) {
      return rejectWithVaue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/categories", categoryData);
      getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/categories/${id}`);
      return { id, type, ...data };
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/edit",
  async ({ id, categoryName, type }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/categories/${id}`, {
        categoryName: categoryName,
      });
      return { type, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
