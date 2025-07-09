import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  getAllTransactions,
} from "../../redux/transactions/operations";
import {
  selectAllTransactions,
  selectIsLoading,
  selectSelectedRadioType,
} from "../../redux/transactions/selectors";
import {
  selectCategoriesList,
  selectIsLoadingForChart,
} from "../../redux/categories/selectors";
import { generateCategoryColors } from "../../utils/colorGenerator";
import { calculateCategorySpending } from "../../utils/analyticsUtils";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import toast from "react-hot-toast";
import { clearCategory } from "../../redux/categories/slice";
import {
  clearTransactionType,
  setTransactionRadioType,
  setTransactionType,
} from "../../redux/transactions/slice";
import styles from "./MainTransactionsPage.module.css";
import { getCategories } from "../../redux/categories/operations";
import { useParams } from "react-router-dom";

const MainTransactionsPage = () => {
  const dispatch = useDispatch();

  const allTransactions = useSelector(selectAllTransactions);
  const selectedRadioType = useSelector(selectSelectedRadioType);
  const transactionsLoading = useSelector(selectIsLoading);
  const categoriesLoading = useSelector(selectIsLoadingForChart);
  const normalizedRadioType =
    selectedRadioType === "all" ? "expenses" : selectedRadioType;

  const { expenses: expenseCategories = [], incomes: incomeCategories = [] } =
    useSelector(selectCategoriesList) || {};

  useEffect(() => {
    dispatch(getAllTransactions());
    dispatch(getCategories());
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

    const categoriesForChart =
      normalizedRadioType === "expenses" ? expenseCategories : incomeCategories;
    const categoriesSummary = calculateCategorySpending(
      allTransactions,
      categoriesForChart,
      normalizedRadioType
    );

    return { expenseSummary, incomeSummary, categoriesSummary };
  }, [
    allTransactions,
    expenseCategories,
    incomeCategories,
    normalizedRadioType,
  ]);

  const categoryColors = useMemo(() => {
    const categoriesForChart =
      normalizedRadioType === "expenses" ? expenseCategories : incomeCategories;
    return generateCategoryColors(categoriesForChart);
  }, [expenseCategories, incomeCategories, normalizedRadioType]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addTransaction(values)).unwrap();
      toast.success("Transaction added");
      dispatch(clearCategory());
      dispatch(clearTransactionType());
      resetForm();
    } catch {
      toast.error("Something went wrong, please try different data.");
    }
  };

  // const today = new Date().toISOString().split("T")[0];

  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const { transactionsType } = useParams();

  const initialType = transactionsType === undefined ? "all" : transactionsType;

  useEffect(() => {
    dispatch(setTransactionRadioType(initialType));
    dispatch(setTransactionType(initialType));
  }, [dispatch, initialType]);

  const formInitialValues = {
    type: initialType,
    date: formattedDate,
    time: formattedTime,
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
            <h1 className={styles.infoHeader} tabIndex={0}>
              {selectedRadioType === "incomes" ? "Income Log" : "Expense Log"}
            </h1>
            <p className={styles.infoText} tabIndex={0}>
              Capture and organize every penny spent with ease! A clear view of
              your financial habits at your fingertips.
            </p>
            <TransactionsTotalAmount
              totalIncome={summaryData.incomeSummary}
              totalExpense={summaryData.expenseSummary}
            />
            {transactionsLoading && categoriesLoading ? (
              <div className={styles.chartWrapper}>
                <h3 className={styles.chartTitle}>
                  {selectedRadioType === "incomes"
                    ? "Income Statistics"
                    : "Expense Statistics"}
                </h3>
                <div className={styles.emptyState}>Lasding data.</div>
              </div>
            ) : (
              <TransactionsChart
                type={normalizedRadioType}
                expenseData={summaryData.categoriesSummary}
                totalExpense={
                  normalizedRadioType === "incomes"
                    ? summaryData.incomeSummary
                    : summaryData.expenseSummary
                }
                categoryColors={categoryColors}
              />
            )}
          </section>

          <section className={styles.formSection} tabIndex={0}>
            <TransactionForm
              onSubmit={handleSubmit}
              initialValues={formInitialValues}
              buttonText={buttonText}
              isDisabled={false}
              isNavigate={true}
            />
          </section>
        </div>
      </Section>
    </Container>
  );
};

export default MainTransactionsPage;
