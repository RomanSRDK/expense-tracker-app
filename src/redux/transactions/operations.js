import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

/**
 Отримуємо всі транзакції користувача @route GET /transactions
 */
export const getAllTransactions = createAsyncThunk(
  "transactions/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/transactions");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 Створюємо нову транзакцію @route POST /transactions
 */
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const token = state.auth.token;

    // if (!token) {
    //   return thunkAPI.rejectWithValue('No valid token');
    // }

    try {
      const { data } = await instance.post("/transactions", transactionData);
      thunkAPI.dispatch(getTransactionsSummary());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 Видаляємо транзакцію @route DELETE /transactions/{transactionId}
 */
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      await instance.delete(`/transactions/${transactionId}`);
      thunkAPI.dispatch(getTransactionsSummary());
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
оновлюємо транзакцію @route PATCH /transactions/{transactionId}
 */
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ transactionId, ...updateData }, thunkAPI) => {
    try {
      const { data } = await instance.patch(
        `/transactions/${transactionId}`,
        updateData
      );
      thunkAPI.dispatch(getTransactionsSummary());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 Оримуємо підсумкові дані по транзакціях @route GET /transactions/summary
 */
export const getTransactionsSummary = createAsyncThunk(
  "transactions/getSummary",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/transactions/summary");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
