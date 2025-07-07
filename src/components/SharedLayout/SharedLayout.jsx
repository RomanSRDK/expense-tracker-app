import { Outlet, useLocation } from "react-router-dom";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";
import Container from "../Container/Container";
import Section from "../Section/Section";
import s from "./SharedLayout.module.css";
import { useEffect, useState } from "react";

const SharedLayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 1440;
  return (
    <Container>
      <Section>
        <div className={`${s.layoutWrapper} ${isAuthPage ? s.authLayout : ""}`}>
          {/* Conditional rendering order */}
          {isDesktop ? (
            <>
              <div className={s.imageContainer}>
                <BgImageWrapper />
              </div>
              <main className={s.main}>
                <Outlet />
              </main>
            </>
          ) : (
            <>
              <main className={s.main}>
                <Outlet />
              </main>
              <div className={s.imageContainer}>
                <BgImageWrapper />
              </div>
            </>
          )}
        </div>
      </Section>
    </Container>
  );
};

export default SharedLayout;
