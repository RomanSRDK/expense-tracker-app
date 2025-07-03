// src/components/Logo/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Імпортуємо селектор, щоб дізнатись статус користувача
import { selectIsLoggedIn } from '../../redux/auth/selectors'; // Шлях може відрізнятись

// Імпортуємо ваші файли логотипів
import logoDesktop from '../../assets/logo-desktop.svg'; // Лого для десктопу/планшету
import logoMobile from '../../assets/logo-mobile.svg';   // Лого для мобілки

// Імпортуємо стилі
import styles from './Logo.module.css';

const Logo = () => {
  // Отримуємо статус авторизації з Redux store
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Визначаємо, куди буде вести посилання
  // Якщо користувач залогінений - на головну сторінку транзакцій, якщо ні - на сторінку привітання
  const destination = isLoggedIn ? '/transactions/expenses' : '/';

  return (
    <Link to={destination} className={styles.logoLink}>
      <picture>
        {/* Це джерело буде використовуватись, якщо ширина екрана 768px або більше */}
        <source media="(min-width: 768px)" srcSet={logoDesktop} />
        
        {/* Це зображення буде використовуватись за замовчуванням (для мобільних) */}
        <img
          src={logoMobile}
          alt="Expense Tracker Logo"
          className={styles.logoImage}
        />
      </picture>
    </Link>
  );
};

export default Logo;