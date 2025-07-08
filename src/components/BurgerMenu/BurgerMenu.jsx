import { useEffect } from "react";
import TransactionsHistoryNav from "../TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "../UserBarBtn/UserBarBtn";
import { RiCloseLargeLine } from "react-icons/ri";
import clsx from "clsx";
import style from "./BurgerMenu.module.css";

const BurgerMenu = ({
  onOpenModal,
  onClose,
  isBurgerOpen,
  onOpenLogoutModal,
}) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isBurgerOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isBurgerOpen, onClose]);

  return (
    <div
      className={clsx(
        style.burgerMenuBackdrop,
        isBurgerOpen && style.burgerMenuOpen
      )}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={style.burgerMenu}>
        <div className={style.burgerCloseUserBtnBar}>
          <UserBarBtn
            onClose={onClose}
            onOpenModal={() => {
              onOpenModal();
              onClose();
            }}
            onOpenLogoutModal={onOpenLogoutModal}
          />
          <button
            onClick={onClose}
            className={style.closeBtn}
            aria-label="button to close mobile menu"
          >
            <RiCloseLargeLine className={style.closeBtnIcon} />
          </button>
        </div>
        <div className={style.transactionsHistoryNavWrap}>
          <TransactionsHistoryNav
            wrapperClassName={style.navInBurger}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
