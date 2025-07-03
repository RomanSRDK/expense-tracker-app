import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../transactions/operations";

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
