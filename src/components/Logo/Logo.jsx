 
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
import { selectIsLoggedIn } from '../../redux/auth/selectors'; 
import logoIconUrl from '../../../public/ExpenseTracker.svg'; 

import styles from './Logo.module.css';

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const destination = isLoggedIn ? '/transactions/expenses' : '/';

  return (
     <Link to={destination} className={styles.logoLink}> 
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