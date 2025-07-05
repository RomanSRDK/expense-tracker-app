import { createSelector } from "@reduxjs/toolkit";
import { selectTransactionType } from "../transactions/selectors";

export const selectIsLoading = (state) => state.categories.isLoading;
export const selectError = (state) => state.categories.error;
export const selectCategoriesList = (state) => state.categories.categoriesList;
export const selectCategory = (state) => state.categories.selectedCategory;
export const selectEditCategory = (state) => state.categories.categotyToEdit;

export const selectFilteredCategories = createSelector(
  [selectCategoriesList, selectTransactionType],
  (categoriesList, selectedType) => {
    if (selectedType === "all") {
      const groups = [
        {
          type: "incomes",
          items: categoriesList.incomes || [],
        },
        {
          type: "expenses",
          items: categoriesList.expenses || [],
        },
      ];
      return groups.filter((group) => group.items.length > 0);
    }

    const items = categoriesList[selectedType] || [];

    return items.length > 0
      ? [
          {
            type: selectedType,
            items,
          },
        ]
      : [];
  }
);
