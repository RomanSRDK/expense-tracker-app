import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsSummary } from '../../redux/transactions/operations';
import { getCategories } from '../../redux/categories/operations'; // <-- 1. Імпортуємо операцію
import { selectAllTransactions, selectTransactionsSummary } from '../../redux/transactions/selectors';
import { selectCategoriesList } from '../../redux/categories/selectors'; // <-- 2. Імпортуємо селектор
import { generateCategoryColors } from '../../utils/colorGenerator'; // <-- 3. Імпортуємо утиліту

import TransactionsTotalAmount from '../../components/TransactionsTotalAmount/TransactionsTotalAmount';
import TransactionsChart from '../../components/TransactionsChart/TransactionsChart';
import TransactionForm from "../../components/TransactionForm/TransactionForm"; 
//import Loader from '../../components/Loader/Loader';  
 
import styles from './MainTransactionsPage.module.css';
 
const MainTransactionsPage = () => {
  const dispatch = useDispatch();
  const summary = useSelector(selectTransactionsSummary);
  const allCategories = useSelector(selectCategoriesList); // Отримуємо всі категорії

  // Запускаємо завантаження даних при першому рендері
  useEffect(() => {
    dispatch(getTransactionsSummary());
    dispatch(getCategories());
  }, [dispatch]);

// if (isLoading) {
  //  return <Loader />;
  //}
  // 4. Генеруємо карту кольорів на основі завантажених категорій
  // useMemo кешує результат, щоб не перераховувати кольори при кожному рендері
  const categoryColors = useMemo(() => {
    // Перевіряємо, чи є масиви в об'єкті allCategories
    const expenseCategories = allCategories.expenses || [];
    const incomeCategories = allCategories.incomes || [];
    return generateCategoryColors([...expenseCategories, ...incomeCategories]);
  }, [allCategories]);
 
 

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>

        {/* Ліва колонка з інформацією */}
        <section className={styles.infoSection}>
          <h1  className={styles.infoHeader}>Expense Log</h1>
          <p className={styles.infoText}>Capture and organize every penny spent with ease! A clear view of your financial habits at your fingertips.</p>
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
  );
};

export default MainTransactionsPage;