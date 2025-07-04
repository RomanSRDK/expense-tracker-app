import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { instance } from "../auth/operations";

const token = import.meta.env.VITE_API_TOKEN;

export const testInsatnce = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getCategories = createAsyncThunk(
  "categories/get",
  async (_, { rejectWithVaue }) => {
    try {
      const { data } = await testInsatnce.get("/categories");
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
      const { data } = await testInsatnce.post("/categories", categoryData);
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
      const { data } = await testInsatnce.delete(`/categories/${id}`);
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
      const { data } = await testInsatnce.patch(`/categories/${id}`, {
        categoryName: categoryName,
      });
      return { type, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
