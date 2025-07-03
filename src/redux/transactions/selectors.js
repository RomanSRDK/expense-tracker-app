// повертає масив усіх транзакцій
export const selectAllTransactions = state => state.transactions.items;

// повертає даніі для чарту та карток
export const selectTransactionsSummary = state => state.transactions.summary;

// повертає загальну суму доходів з summary
export const selectTotalIncome = state => state.transactions.summary.incomeSummary;

// Повертає загальну суму витрат з summary
export const selectTotalExpense = state => state.transactions.summary.expenseSummary;

// повертає масив категорій з їх підсумками для  графіку
export const selectExpenseCategories = state => state.transactions.summary.categoriesSummary;

// Повертає статус Loading
export const selectIsLoading = state => state.transactions.isLoading;

// поовертає помилку
export const selectError = state => state.transactions.error;