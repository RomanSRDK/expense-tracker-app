import React from "react";
import { useSelector } from "react-redux"; // 1. Импортируем useSelector
import { HiMiniArrowUpRight, HiMiniArrowDownLeft } from "react-icons/hi2";
import { selectCurrency } from "../../redux/user/selectors"; // 2. Импортируем селектор валюты
import { getCurrencySymbol } from "../../utils/currencyUtils"; // 3. Импортируем утилиту
import styles from "./TransactionsTotalAmount.module.css";

const TransactionsTotalAmount = ({ totalIncome = 0, totalExpense = 0 }) => {
  // 4. Получаем код текущей валюты из Redux
  const currencyCode = useSelector(selectCurrency);
  // 5. Получаем символ на основе кода
  const currencySymbol = getCurrencySymbol(currencyCode);

  const formatCurrency = (amount) => {
    const validAmount = amount || 0;
    // 6. Используем динамический символ вместо "₴"
    return `${currencySymbol} ${validAmount.toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
    })}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.totalBlock}>
        <div className={`${styles.iconWrapper} ${styles.iconWrapperExpense}`}>
          <HiMiniArrowUpRight />
        </div>
        <div className={styles.info}>
          <h3>Total Income</h3>
          <p>{formatCurrency(totalIncome)}</p>
        </div>
      </div>
      <div className={styles.totalBlock}>
        <div className={`${styles.iconWrapper} ${styles.iconWrapperIncome}`}>
          <HiMiniArrowDownLeft />
        </div>
        <div className={styles.info}>
          <h3>Total Expenses</h3>
          <p>{formatCurrency(totalExpense)}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTotalAmount;
