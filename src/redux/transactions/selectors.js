// Повертає масив усіх транзакцій
export const selectAllTransactions = (state) => state.transactions.items;

// Повертає даніі для чарту та карток
export const selectTransactionsSummary = (state) => state.transactions.summary;

// Повертає загальну суму доходів з summary
export const selectTotalIncome = (state) =>
  state.transactions.summary.incomeSummary;

// Повертає загальну суму витрат з summary
export const selectTotalExpense = (state) =>
  state.transactions.summary.expenseSummary;

// Повертає масив категорій з їх підсумками для  графіку
export const selectExpenseCategories = (state) =>
  state.transactions.summary.categoriesSummary;

// Повертає статус Loading
export const selectIsLoading = (state) => state.transactions.isLoading;

// поовертає помилку
export const selectError = (state) => state.transactions.error;

// Повертає статус модального вікна
export const selectCategoriesModalIsOpen = (state) =>
  state.transactions.categoriesModalIsOpen;

// Повертає тип обраної транзакції
export const selectTransactionType = (state) => state.transactions.selectedType;

// Повертає обраний тип з модалки
export const selectSelectedRadioType = (state) =>
  state.transactions.selectedRadioType;

// Повертає масив обраних транзакцій
export const selectQueryTransactions = (state) => state.transactions.items;

// Повертає стату відкриття/закриття модалки редагування транзакції
export const selectIsOpenTransactionEdit = (state) =>
  state.transactions.editModalIsOpen;

// Повертає транзакію вибріну для редагування
export const selectTransactionToEdit = (state) =>
  state.transactions.transactionToEdit;
