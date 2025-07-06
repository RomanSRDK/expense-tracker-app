import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import MainTransactionsHeader from "../MainTransactionsHeader/MainTransactionsHeader";
import HeaderGuest from "../HeaderGuest/HeaderGuest";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header>{isLoggedIn ? <MainTransactionsHeader /> : <HeaderGuest />}</header>
  );
};

export default AppBar;
