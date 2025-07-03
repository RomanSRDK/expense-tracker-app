export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectError = (state) => state.transactions.error;
export const selectModalIsOpen = (state) => state.transactions.modalIsOpen;
export const selctsetTransactionType = (state) =>
  state.transactions.selectedType;
