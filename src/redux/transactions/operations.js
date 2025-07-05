import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations"; // <-- Импортируем instance

/**
 * Получает ВСЕ транзакции (и доходы, и расходы)
 */
export const getAllTransactions = createAsyncThunk(
  "transactions/getAll",
  async (_, { rejectWithValue }) => {
    try {
      // Делаем два запроса и объединяем результаты
      const [incomesResponse, expensesResponse] = await Promise.all([
        instance.get("/transactions/incomes"),
        instance.get("/transactions/expenses"),
      ]);
      return [...incomesResponse.data, ...expensesResponse.data];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Создает новую транзакцию
 */
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await instance.post("/transactions", transactionData);
      dispatch(getAllTransactions()); // Обновляем список транзакций
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Удаляет транзакцию
 */
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, { dispatch, rejectWithValue }) => {
    try {
      await instance.delete(`/transactions/${transactionId}`);
      dispatch(getAllTransactions()); // Обновляем список
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Обновляет транзакцию
 */
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ type, id, ...updateData }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `/transactions/${type}/${id}`,
        updateData
      );
      dispatch(getAllTransactions()); // Обновляем список
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);