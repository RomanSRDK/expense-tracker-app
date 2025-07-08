import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import logoIconUrl from "../../assets/ExpenseTracker.svg";

import styles from "./Logo.module.css";
import { clearTransactionRadioType } from "../../redux/transactions/slice";

const Logo = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const destination = isLoggedIn ? "/transactions" : "/";

  return (
    <Link
      to={destination}
      className={styles.logoLink}
      onClick={() => dispatch(clearTransactionRadioType())}
    >
      <img
        src={logoIconUrl}
        alt="Expense Tracker Icon"
        className={styles.logoIcon}
      />
      <span className={styles.logoText}>EXPENSETRACKER</span>
    </Link>
  );
};

export default Logo;
