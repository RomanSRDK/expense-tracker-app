import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "./transactions/slice";
import { categoriesReducer } from "./categories/slice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
});
