import React, { useEffect, useMemo, useState } from "react"; // 1. Импортируем useState
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  getAllTransactions,
} from "../../redux/transactions/operations";
import {
  selectAllTransactions,
  selectIsLoading as selectTransactionsIsLoading,
} from "../../redux/transactions/selectors";
import {
  selectCategoriesList,
  selectIsLoading as selectCategoriesIsLoading,
} from "../../redux/categories/selectors";
import { generateCategoryColors } from "../../utils/colorGenerator";
import { getCategories } from "../../redux/categories/operations";
import { calculateCategorySpending } from "../../utils/analyticsUtils";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Loader from "../../components/Loader/Loader";
import styles from "./MainTransactionsPage.module.css";
import toast from "react-hot-toast";
import {
  clearCategoriesList,
  clearCategory,
} from "../../redux/categories/slice";
import {
  clearTransactionRadioType,
  clearTransactionType,
} from "../../redux/transactions/slice";

const MainTransactionsPage = () => {
  const dispatch = useDispatch();

  // 2. Создаем состояние для отслеживания типа транзакции
  const [transactionType, setTransactionType] = useState("expenses"); // По умолчанию 'expenses'

  const allTransactions = useSelector(selectAllTransactions);
  const { expenses: expenseCategories = [], incomes: incomeCategories = [] } =
    useSelector(selectCategoriesList) || {};
  const isTransactionsLoading = useSelector(selectTransactionsIsLoading);
  const isCategoriesLoading = useSelector(selectCategoriesIsLoading);
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

    // 3. Выбираем, какие категории и данные использовать, в зависимости от transactionType
    const categoriesForChart =
      transactionType === "incomes" ? incomeCategories : expenseCategories;
    const categoriesSummary = calculateCategorySpending(
      allTransactions,
      categoriesForChart,
      transactionType
    );

    return { expenseSummary, incomeSummary, categoriesSummary };
  }, [allTransactions, expenseCategories, incomeCategories, transactionType]); // <-- Добавляем зависимости

  const categoryColors = useMemo(() => {
    const categoriesForChart =
      transactionType === "incomes" ? incomeCategories : expenseCategories;
    return generateCategoryColors(categoriesForChart);
  }, [expenseCategories, incomeCategories, transactionType]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addTransaction(values)).unwrap();
      toast.success("Transaction added");
      dispatch(clearCategory());
      dispatch(clearTransactionType());
      dispatch(clearTransactionRadioType());
      dispatch(clearCategoriesList());
      resetForm();
    } catch {
      toast.error("Something went wrong, please try different data.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  const formInitialValues = {
    type: transactionType, // 4. Устанавливаем начальное значение для формы
    date: today,
    time: formattedTime,
    category: "",
    sum: "",
    comment: "",
  };

  const buttonText = "Add";
  if (isTransactionsLoading || isCategoriesLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <Section>
        <div className={styles.pageWrapper}>
          <section className={styles.infoSection}>
            {/* 5. Заголовок теперь зависит от transactionType */}
            <h1 className={styles.infoHeader}>
              {transactionType === "incomes" ? "Income Log" : "Expense Log"}
            </h1>
            <p className={styles.infoText}>
              Capture and organize every penny spent with ease! A clear view of
              your financial habits at your fingertips.
            </p>
            <TransactionsTotalAmount
              totalIncome={summaryData.incomeSummary}
              totalExpense={summaryData.expenseSummary}
            />
            {/* 6. График теперь отображает данные в зависимости от transactionType */}
            <TransactionsChart
              type={transactionType}
              expenseData={summaryData.categoriesSummary}
              totalExpense={
                transactionType === "incomes"
                  ? summaryData.incomeSummary
                  : summaryData.expenseSummary
              }
              categoryColors={categoryColors}
            />
          </section>

          <section className={styles.formSection}>
            <TransactionForm
              onSubmit={handleSubmit}
              initialValues={formInitialValues}
              buttonText={buttonText}
              isDisabled={false}
              // 7. Передаем тип и функцию для его изменения в форму
              onTypeChange={setTransactionType}
            />
          </section>
        </div>
      </Section>
    </Container>
  );
};

export default MainTransactionsPage;
