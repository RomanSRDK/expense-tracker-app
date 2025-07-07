import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

import Logo from '../Logo/Logo';
import TransactionsHistoryNav from '../TransactionsHistoryNav/TransactionsHistoryNav';
import BurgerMenuBtn from '../BurgerMenuBtn/BurgerMenuBtn';
import UserBarBtn from '../UserBarBtn/UserBarBtn';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import UserSetsModal from '../UserSetsModal/UserSetsModal';
 

import styles from './MainTransactionsHeader.module.css';

const MainTransactionsHeader = () => {
 
  const user = useSelector(selectUser);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

 
  const toggleBurger = () => {
    setIsBurgerOpen((prev) => !prev);
  };
  const closeBurger = () => setIsBurgerOpen(false);

   
  const openUserModal = () => {
    if (isBurgerOpen) closeBurger();  
    setIsUserModalOpen(true);
  };
  const closeUserModal = () => setIsUserModalOpen(false);
   
  const openLogoutModal = () => {
    if (isBurgerOpen) closeBurger();  
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        closeBurger();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Logo />

          <div className={styles.desktopNav}>
            <TransactionsHistoryNav />
          </div>

          <div className={styles.desktopUserBar}> 
            <UserBarBtn
              onOpenModal={openUserModal}
              onOpenLogoutModal={openLogoutModal}
            />
          </div>

          <div className={styles.mobileNav}>
            
            <BurgerMenuBtn onClick={toggleBurger} />
          </div>
        </div>
      </header>
 
      {isBurgerOpen && (
        <BurgerMenu
          isBurgerOpen={isBurgerOpen}
          onClose={closeBurger}
          onOpenModal={openUserModal}
          onOpenLogoutModal={openLogoutModal}
        />
      )}
      
      {isUserModalOpen && <UserSetsModal closeModal={closeUserModal} />}
      
      
    </>
  );
};

export default MainTransactionsHeader;