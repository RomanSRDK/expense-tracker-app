import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://expense-tracker.b.goit.study/api';

/**
 отримуємо всі транзакції користувача @route GET /transactions
 */
export const getAllTransactions = createAsyncThunk(
  'transactions/getAll',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      const response = await axios.get(`${BASE_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 сттворюємо нову транзакцію @route POST /transactions
 */
export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/transactions`,
        transactionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(getTransactionsSummary());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 Видаляємо транзакцію @route DELETE /transactions/{transactionId}
 */
export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      await axios.delete(`${BASE_URL}/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  'transactions/updateTransaction',
  async ({ transactionId, ...updateData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      const response = await axios.patch(
        `${BASE_URL}/transactions/${transactionId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(getTransactionsSummary());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 оримуємо підсумкові дані по транзакціях @route GET /transactions/summary
 */
export const getTransactionsSummary = createAsyncThunk(
  'transactions/getSummary',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      const response = await axios.get(`${BASE_URL}/transactions/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
