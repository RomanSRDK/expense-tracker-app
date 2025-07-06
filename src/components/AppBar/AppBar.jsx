import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import MainTransactionsHeader from "../MainTransactionsHeader/MainTransactionsHeader";
import Header from "../Header/Header";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header>{isLoggedIn ? <MainTransactionsHeader /> : <Header />}</header>
  );
};

export default AppBar;
