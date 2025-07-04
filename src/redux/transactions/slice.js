import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionsSummary,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
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
  modalIsOpen: false,
  selectedType: "all",
  selectedRadioType: "",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    openCategoriesModal(state) {
      state.modalIsOpen = true;
    },
    closeCategoriesModal(state) {
      state.modalIsOpen = false;
    },
    setTransactionType(state, { payload }) {
      state.selectedType = payload;
    },
    clearTransactionType(state) {
      state.selectedType = "all";
    },
    setTransactionRadioType(state, { payload }) {
      state.selectedRadioType = payload;
    },
    clearTransactionRadioType(state) {
      state.selectedRadioType = "all";
    },
  },
  extraReducers: (builder) => {
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
        state.selectedType = "all";
      })
      .addCase(addTransaction.rejected, handleRejected)

      // Видалення транзакції
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.selectedType = "all";
      })
      .addCase(deleteTransaction.rejected, handleRejected)

      // Оновлення транзакції
      .addCase(updateTransaction.pending, handlePending)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
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

export const {
  openCategoriesModal,
  closeCategoriesModal,
  setTransactionType,
  clearTransactionType,
  setTransactionRadioType,
  clearTransactionRadioType,
} = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
