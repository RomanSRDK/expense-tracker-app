import React from "react";
import Logo from "../Logo/Logo";
import TransactionsHistoryNav from "../TransactionsHistoryNav/TransactionsHistoryNav";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import UserBarBtn from "../UserBarBtn/UserBarBtn";
import styles from "./MainTransactionsHeader.module.css";

const MainTransactionsHeader = () => {
  return (
    <header className={styles.header}>
      {/* 1. Добавляем внутренний контейнер-обертку */}
      <div className={styles.headerContainer}>
        <Logo />

        <div className={styles.desktopNav}>
          <TransactionsHistoryNav />
        </div>

        <div className={styles.desktopUserBar}>
          <UserBarBtn />
        </div>

        <div className={styles.mobileNav}>
          <BurgerMenuBtn />
        </div>
      </div>
    </header>
  );
};

export default MainTransactionsHeader;
