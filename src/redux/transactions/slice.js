import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getQueryTransactions,
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
  isLoading: false,
  error: null,
  categoriesModalIsOpen: false,
  selectedType: "all",
  selectedRadioType: "",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    openCategoriesModal(state) {
      state.categoriesModalIsOpen = true;
    },
    closeCategoriesModal(state) {
      state.categoriesModalIsOpen = false;
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
      .addCase(getAllTransactions.pending, handlePending)
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getAllTransactions.rejected, handleRejected)

      // Отримання обраних транзакцій
      .addCase(getQueryTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQueryTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getQueryTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addTransaction.rejected, handleRejected)

      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTransaction.rejected, handleRejected)

      .addCase(updateTransaction.pending, handlePending)
      .addCase(updateTransaction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTransaction.rejected, handleRejected);
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
