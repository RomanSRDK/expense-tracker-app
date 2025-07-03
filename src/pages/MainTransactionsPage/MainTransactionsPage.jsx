import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { getTransactionsSummary } from '../../redux/transactions/operations'; 
import { selectIsLoading } from '../../redux/transactions/selectors';
import TransactionForm from "../../components/TransactionForm/TransactionForm";

// Імпортуємо дочірні компоненти
import TransactionsTotalAmount from '../../components/TransactionsTotalAmount/TransactionsTotalAmount';
import TransactionsChart from '../../components/TransactionsChart/TransactionsChart';
//import TransactionForm from '../../components/TransactionForm/TransactionForm';
//import Loader from '../../components/Loader/Loader';  
 
import styles from './MainTransactionsPage.module.css';

//  дані для кольорів, їх краще тримати в константах
const CATEGORY_COLORS = {
  'Продукти': '#FF6384',
  'Транспорт': '#36A2EB',
  'Здоров\'я': '#FFCE56',
  'Розваги': '#4BC0C0',
  'Комунальні': '#9966FF',
  'Інше': '#FF9F40',
  'default': '#C9CBCF'
};

const MainTransactionsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  // Запускаємо завантаження підсумкових даних, коли компонент монтується
  useEffect(() => {
    dispatch(getTransactionsSummary());
  }, [dispatch]);

  //   спінер завантаження
 // if (isLoading) {
 //   return <Loader />;
 // }

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        {/* Ліва колонка з інформацією */}
        <section className={styles.infoSection}>
          <TransactionsTotalAmount />
          <TransactionsChart categoryColors={CATEGORY_COLORS} />
        </section>

        {/* Права колонка з формою */}
        <section className={styles.formSection}>
          <h1 className={styles.title}>Створення транзакції</h1>
          <p className={styles.description}>
            Внесіть дані про ваші доходи або витрати.
          </p>
          <TransactionForm />
        </section>
      </main>
    </div>
  );
};

export default MainTransactionsPage;