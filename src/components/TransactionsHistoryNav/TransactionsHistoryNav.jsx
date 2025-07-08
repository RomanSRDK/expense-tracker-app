import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx"; // 1. Импортируем clsx
import styles from "./TransactionsHistoryNav.module.css";

// 2. Компонент теперь принимает пропс wrapperClassName
const TransactionsHistoryNav = ({ wrapperClassName, onClose }) => {
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    // 3. Объединяем стандартный класс .nav с тем, что пришел из пропсов
    <nav className={clsx(styles.nav, wrapperClassName)}>
      <NavLink
        to="/transactions/history/expenses"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
        onClick={handleLinkClick}
      >
        All Expense
      </NavLink>
      <NavLink
        to="/transactions/history/incomes"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
        onClick={handleLinkClick}
      >
        All Income
      </NavLink>
    </nav>
  );
};

export default TransactionsHistoryNav;
