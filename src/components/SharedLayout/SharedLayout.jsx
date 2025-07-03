import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";

const SharedLayout = ({ isLoggedIn }) => {
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
