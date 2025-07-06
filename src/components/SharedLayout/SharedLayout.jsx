import { Outlet, useLocation } from "react-router-dom";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";
import Container from "../Container/Container";
import s from "./SharedLayout.module.css";

const SharedLayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";
  return (
    <Container>
      <div className={`${s.layoutWrapper} ${isAuthPage ? s.authLayout : ""}`}>
        <div className={s.imageContainer}>
          <BgImageWrapper />
        </div>
        <main className={s.main}>
          <Outlet />
        </main>
      </div>
    </Container>
  );
};

export default SharedLayout;
