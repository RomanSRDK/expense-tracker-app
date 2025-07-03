import React from "react";
import DecorationTab from "../DecorationTab/DecorationTab";
import css from "./BgImageWrapper.module.css";
import { useLocation } from "react-router-dom";

const BgImageWrapper = ({ children }) => {
  const location = useLocation();

  // Render nothing on mobile/tablet if NOT WelcomePage
  // Always render on desktop (CSS controls visibility)
  if (location.pathname !== "/" && window.innerWidth < 1440) {
    return <>{children}</>;
  }
  return (
    <div className={css.bgWrapper}>
      <DecorationTab />
      {children}
    </div>
  );
};

export default BgImageWrapper;
