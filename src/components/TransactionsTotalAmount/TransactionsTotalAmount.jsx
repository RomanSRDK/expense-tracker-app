import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalIncome, selectTotalExpense } from '../../redux/transactions/selectors';  
import { HiMiniArrowUpRight, HiMiniArrowDownLeft } from 'react-icons/hi2'; 
import styles from './TransactionsTotalAmount.module.css';

const TransactionsTotalAmount = () => {
  // отримуємо дані напряму зі стору
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);

  const formatCurrency = (amount) => {
    return `₴ ${amount.toLocaleString('uk-UA', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.totalBlock}>
        <div className={`${styles.iconWrapper} ${styles.iconWrapperExpense}`}><HiMiniArrowUpRight  /></div>
        <div className={styles.info}>
          <h3>Total Income</h3>
          <p>{formatCurrency(totalIncome)}</p>
        </div>
      </div>
      <div className={styles.totalBlock}>
        <div className={`${styles.iconWrapper} ${styles.iconWrapperIncome}`}><HiMiniArrowDownLeft /></div>
        <div className={styles.info}>
          <h3>Total Expenses</h3>
          <p>{formatCurrency(totalExpense)}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTotalAmount;