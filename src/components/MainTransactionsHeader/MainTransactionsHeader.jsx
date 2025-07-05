import React from 'react';
import Logo from '../Logo/Logo';
import TransactionsHistoryNav from '../TransactionsHistoryNav/TransactionsHistoryNav';
import BurgerMenuBtn from '../BurgerMenuBtn/BurgerMenuBtn';
import UserBarBtn from '../UserBarBtn/UserBarBtn';
import styles from './MainTransactionsHeader.module.css';

const MainTransactionsHeader = () => {
  return (
    <header className={styles.header}>
      <Logo />

      {/* Навигация, видимая только на десктопе */}
      <div className={styles.desktopNav}>
        <TransactionsHistoryNav />
      </div>

      {/* Кнопка пользователя, видимая только на десктопе */}
      <div className={styles.desktopUserBar}>
        <UserBarBtn />
      </div>

      {/* Кнопка бургер-меню, видимая только на мобильных/планшетах */}
      <div className={styles.mobileNav}>
        <BurgerMenuBtn />
      </div>
    </header>
  );
};

export default MainTransactionsHeader;