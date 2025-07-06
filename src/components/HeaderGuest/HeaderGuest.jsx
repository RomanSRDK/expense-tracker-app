import Logo from "../Logo/Logo";
import css from "./HeaderGuest.module.css";

const HeaderGuest = () => {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Logo />
      </div>
    </header>
  );
};

export default HeaderGuest;
