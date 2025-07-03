import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const SharedLayout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Header />
      {!isLoggedIn && <BgImageWrapper />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
