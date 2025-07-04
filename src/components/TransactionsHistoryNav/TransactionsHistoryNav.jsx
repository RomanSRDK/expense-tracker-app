import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./TransactionsHistoryNav.module.css";

const TransactionsHistoryNav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/transactions/history/expenses"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
      >
        All Expense
      </NavLink>
      <NavLink
        to="/transactions/history/incomes"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
      >
        All Income
      </NavLink>
    </nav>
  );
};

export default TransactionsHistoryNav;
