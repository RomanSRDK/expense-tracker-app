import { createSlice } from "@reduxjs/toolkit";
import { addTransaction } from "./operations";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    isLoading: false,
    error: null,
    modalIsOpen: false,
    selectedType: "all",
  },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.transactions.push(payload);
      })
      .addCase(addTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { openCategoriesModal, closeCategoriesModal, setTransactionType } =
  transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
