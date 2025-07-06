import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  getAllTransactions,
} from "../../redux/transactions/operations";
import { selectAllTransactions } from "../../redux/transactions/selectors";
import { selectCategoriesList } from "../../redux/categories/selectors";
import { generateCategoryColors } from "../../utils/colorGenerator";
import { calculateCategorySpending } from "../../utils/analyticsUtils";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import styles from "./MainTransactionsPage.module.css";
import toast from "react-hot-toast";
import { clearCategory } from "../../redux/categories/slice";
import {
  clearTransactionRadioType,
  clearTransactionType,
} from "../../redux/transactions/slice";

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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addTransaction(values)).unwrap();
      toast.success("Transaction added");
      dispatch(clearCategory());
      dispatch(clearTransactionType());
      dispatch(clearTransactionRadioType());
      resetForm();
    } catch {
      toast.error("Something went wrong, please try different data.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toISOString().split("T")[1].slice(0, 5);

  const formInitialValues = {
    type: "",
    date: today,
    time: currentTime,
    category: "",
    sum: "",
    comment: "",
  };

  const buttonText = "Add";

  return (
    <Container>
      <Section>
        <div className={styles.pageWrapper}>
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
            <TransactionForm
              onSubmit={handleSubmit}
              initialValues={formInitialValues}
              buttonText={buttonText}
              isDisabled={false}
            />
          </section>
        </div>
      </Section>
    </Container>
  );
};

export default MainTransactionsPage;
