import { HiOutlineMenuAlt4 } from "react-icons/hi";
import style from "./BurgerMenuBtn.module.css";

const BurgerMenuBtn = ({ onClick }) => {
  return (
    <button className={style.burgerMenuBtn} onClick={onClick}>
      <HiOutlineMenuAlt4 className={style.burgerMenuIcon} />
    </button>
  );
};

export default BurgerMenuBtn;
