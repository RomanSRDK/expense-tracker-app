import { useEffect, useState } from "react";
import DecorationTab from "../DecorationTab/DecorationTab";
import css from "./BgImageWrapper.module.css";
import { useLocation } from "react-router-dom";

const BgImageWrapper = ({ children }) => {
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isWelcomePage = location.pathname === "/";
  const isDesktop = windowWidth >= 1440;

  if (!isDesktop && !isWelcomePage) {
    return null;
  }

  return (
    <div className={css.bgWrapper}>
      <DecorationTab />
      {children}
    </div>
  );
};

export default BgImageWrapper;
