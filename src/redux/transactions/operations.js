import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = import.meta.env.VITE_WATRE_TRACKER;

export const instance = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionData, { rejactWithValue }) => {
    try {
      const { data } = await instance.post("/transactions", transactionData);
      return data;
    } catch (error) {
      return rejactWithValue(error);
    }
  }
);
