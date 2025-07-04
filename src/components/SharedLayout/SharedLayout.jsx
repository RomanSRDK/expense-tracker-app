import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";
import s from "./SharedLayout.module.css";

const SharedLayout = ({ isLoggedIn }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";
  return (
    <>
      <Header />
      <div className={`${s.layoutWrapper} ${isAuthPage ? s.authLayout : ""}`}>
        {!isLoggedIn && (
          <div className={s.imageContainer}>
            <BgImageWrapper />
          </div>
        )}
        <main className={s.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SharedLayout;
