import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; //useDispatch,

import clsx from "clsx";

import Logo from "../Logo/Logo";
import TransactionsHistoryNav from "../TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "../UserBarBtn/UserBarBtn";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import UserSetsModal from "../UserSetsModal/UserSetsModal";

import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

import s from "./Header.module.css";

const Header = () => {
  // const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1440;
  const isDesktop = windowWidth >= 1440;

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth((prevWidth) =>
        prevWidth !== currentWidth ? currentWidth : prevWidth
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleBurger = () => {
    // console.log("toggleBurger called");
    if (!isModalOpen) {
      // console.log("Burger toggle clicked");
      setIsBurgerOpen((prev) => !prev);
    }
  };

  const closeBurger = () => setIsBurgerOpen(false);

  const toggleModal = () => {
    if (isBurgerOpen) closeBurger();
    setIsModalOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    if (isBurgerOpen) closeBurger();
    setIsModalOpen(true);
  };

  const openLogoutModal = () => {
    closeBurger();
    setIsLogoutModalOpen(true);
  };

  // const closeLogoutModal = () => setIsLogoutModalOpen(false);

  // const confirmLogout = () => {
  //   dispatch(logOut());
  //   closeLogoutModal();
  // };

  return (
    <div className={s.headerContainer}>
      <header
        className={clsx(
          s.header,
          isLoggedIn ? (isDesktop ? s.authDesktop : s.authMobile) : s.guest
        )}
      >
        <Logo />
        {isLoggedIn && (
          <>
            {isDesktop && (
              <>
                <TransactionsHistoryNav />
                <UserBarBtn
                  user={user}
                  onOpenModal={toggleModal}
                  onOpenLogoutModal={openLogoutModal}
                />
              </>
            )}
            {(isMobile || isTablet) && (
              <div>
                <BurgerMenuBtn onClick={toggleBurger} />
                <span>DEBUG: Burger button visible</span>
                <BurgerMenu
                  isBurgerOpen={isBurgerOpen}
                  onClose={closeBurger}
                  onOpenModal={handleOpenModal}
                  onOpenLogoutModal={openLogoutModal}
                />
              </div>
            )}
          </>
        )}
        {isModalOpen && <UserSetsModal />}
        {isLogoutModalOpen && (
          <LogoutConfirmModal
          // onConfirm={confirmLogout}
          // onCancel={closeLogoutModal}
          />
        )}
      </header>
    </div>
  );
};

export default Header;
