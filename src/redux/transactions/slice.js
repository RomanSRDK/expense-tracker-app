import { createSlice } from '@reduxjs/toolkit';
import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionsSummary,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = { 
  items: [], 
  summary: {
    categoriesSummary: [],
    expenseSummary: 0,
    incomeSummary: 0,
    periodTotal: 0,  
  },
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: builder => {
    builder
      // Отримання всіх транзакцій
      .addCase(getAllTransactions.pending, handlePending)
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getAllTransactions.rejected, handleRejected)

      // Додавання транзакції
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload); // Додавання нової транзакції в список
      })
      .addCase(addTransaction.rejected, handleRejected)

      // Видалення транзакції
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, handleRejected)

      // Оновлення транзакції
      .addCase(updateTransaction.pending, handlePending)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, handleRejected)

      //Підсумкові дані
      .addCase(getTransactionsSummary.pending, handlePending)
      .addCase(getTransactionsSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(getTransactionsSummary.rejected, handleRejected);
  },
});

export default transactionsSlice.reducer;