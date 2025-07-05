import React from 'react';
// Убираем useSelector и селекторы, они больше не нужны
import { HiMiniArrowUpRight, HiMiniArrowDownLeft } from 'react-icons/hi2'; 
import styles from './TransactionsTotalAmount.module.css';

// 1. Компонент теперь принимает totalIncome и totalExpense как props
const TransactionsTotalAmount = ({ totalIncome = 0, totalExpense = 0 }) => {

  const formatCurrency = (amount) => {
    // Добавим проверку, чтобы amount не был null или undefined
    const validAmount = amount || 0;
    return `₴ ${validAmount.toLocaleString('uk-UA', { minimumFractionDigits: 2 })}`;
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