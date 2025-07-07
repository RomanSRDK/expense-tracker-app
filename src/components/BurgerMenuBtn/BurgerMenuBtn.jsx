import { HiOutlineMenuAlt4 } from "react-icons/hi";
import style from "./BurgerMenuBtn.module.css";

const BurgerMenuBtn = () => {
  const handleClick = () => {};
  return (
    <button type="button" className={style.burgerMenuBtn} onClick={handleClick}>
      <HiOutlineMenuAlt4 className={style.burgerMenuIcon} />
    </button>
  );
};

export default BurgerMenuBtn;
