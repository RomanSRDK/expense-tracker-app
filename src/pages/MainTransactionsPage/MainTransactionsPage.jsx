import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsSummary } from "../../redux/transactions/operations";
import { getCategories } from "../../redux/categories/operations";
import {
  selectAllTransactions,
  selectTransactionsSummary,
} from "../../redux/transactions/selectors";
import { selectCategoriesList } from "../../redux/categories/selectors";
import { generateCategoryColors } from "../../utils/colorGenerator";

import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import MainTransactionsHeader from "../../components/MainTransactionsHeader/MainTransactionsHeader";

import styles from "./MainTransactionsPage.module.css";

const MainTransactionsPage = () => {
  const dispatch = useDispatch();
  const summary = useSelector(selectTransactionsSummary);
  const allCategories = useSelector(selectCategoriesList);

  useEffect(() => {
    dispatch(getTransactionsSummary());
    dispatch(getCategories());
  }, [dispatch]);

  const categoryColors = useMemo(() => {
    const expenseCategories = allCategories.expenses || [];
    const incomeCategories = allCategories.incomes || [];
    return generateCategoryColors([...expenseCategories, ...incomeCategories]);
  }, [allCategories]);

  return (
    <>
      <MainTransactionsHeader />
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          {/* Ліва колонка з інформацією */}
          <section className={styles.infoSection}>
            <h1 className={styles.infoHeader}>Expense Log</h1>
            <p className={styles.infoText}>
              Capture and organize every penny spent with ease! A clear view of
              your financial habits at your fingertips.
            </p>
            <TransactionsTotalAmount />
            <TransactionsChart
              expenseData={summary.categoriesSummary}
              totalExpense={summary.expenseSummary}
              categoryColors={categoryColors}
            />
          </section>

          {/* Права колонка з формою */}
          <section className={styles.formSection}>
            <TransactionForm />
          </section>
        </main>
      </div>
    </>
  );
};

export default MainTransactionsPage;
