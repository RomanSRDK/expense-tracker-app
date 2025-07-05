import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../redux/transactions/operations";
import { getCategories } from "../../redux/categories/operations";
import { selectAllTransactions } from "../../redux/transactions/selectors";
import { selectCategoriesList } from "../../redux/categories/selectors";
import { generateCategoryColors } from "../../utils/colorGenerator";
import { calculateCategorySpending } from "../../utils/analyticsUtils";

import MainTransactionsHeader from "../../components/MainTransactionsHeader/MainTransactionsHeader";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import styles from "./MainTransactionsPage.module.css";

const MainTransactionsPage = () => {
  const dispatch = useDispatch();

  const allTransactions = useSelector(selectAllTransactions);
  const { expenses: expenseCategories = [] } =
    useSelector(selectCategoriesList) || {};

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  const summaryData = useMemo(() => {
    if (!allTransactions || allTransactions.length === 0) {
      return { expenseSummary: 0, incomeSummary: 0, categoriesSummary: [] };
    }

    const expenseSummary = allTransactions
      .filter((t) => t.type && t.type.toLowerCase() === "expenses")
      .reduce((sum, t) => sum + t.sum, 0);

    const incomeSummary = allTransactions
      .filter((t) => t.type && t.type.toLowerCase() === "incomes")
      .reduce((sum, t) => sum + t.sum, 0);

    const categoriesSummary = calculateCategorySpending(
      allTransactions,
      expenseCategories,
      "expenses"
    );

    return { expenseSummary, incomeSummary, categoriesSummary };
  }, [allTransactions, expenseCategories]);

  const categoryColors = useMemo(() => {
    return generateCategoryColors(expenseCategories);
  }, [expenseCategories]);

  return (
    <>
      <MainTransactionsHeader />
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          <section className={styles.infoSection}>
            <h1 className={styles.infoHeader}>Expense Log</h1>
            <p className={styles.infoText}>
              Capture and organize every penny spent with ease! A clear view of
              your financial habits at your fingertips.
            </p>
            <TransactionsTotalAmount
              totalIncome={summaryData.incomeSummary}
              totalExpense={summaryData.expenseSummary}
            />
            <TransactionsChart
              expenseData={summaryData.categoriesSummary}
              totalExpense={summaryData.expenseSummary}
              categoryColors={categoryColors}
            />
          </section>

          <section className={styles.formSection}>
            <TransactionForm />
          </section>
        </main>
      </div>
    </>
  );
};

export default MainTransactionsPage;
