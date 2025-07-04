import { createSelector } from "@reduxjs/toolkit";
import { selctsetTransactionType } from "../transactions/selectors";

export const selectIsLoading = (state) => state.categories.isLoading;
export const selectError = (state) => state.categories.error;
export const selectCategoriesList = (state) => state.categories.categoriesList;
export const selectCategory = (state) => state.categories.selectedCategory;
export const selectEditCategory = (state) => state.categories.categotyToEdit;

export const selectFilteredCategories = createSelector(
  [selectCategoriesList, selctsetTransactionType],
  (categoriesList, selectedType) => {
    if (selectedType === "all") {
      return [
        ...(categoriesList.incomes || []),
        ...(categoriesList.expenses || []),
      ];
    }

    return categoriesList[selectedType] || [];
  }
);
