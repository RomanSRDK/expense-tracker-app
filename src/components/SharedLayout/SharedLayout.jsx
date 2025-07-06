import { Outlet, useLocation } from "react-router-dom";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";
import Container from "../Container/Container";
import Section from "../Section/Section";
import s from "./SharedLayout.module.css";

const SharedLayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";
  return (
    <Container>
      <Section>
        <div className={`${s.layoutWrapper} ${isAuthPage ? s.authLayout : ""}`}>
          <div className={s.imageContainer}>
            <BgImageWrapper />
          </div>
          <main className={s.main}>
            <Outlet />
          </main>
        </div>
      </Section>
    </Container>
  );
};

export default SharedLayout;
