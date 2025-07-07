import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsRefreshing,
  selectRefreshToken,
  selectIsLoggedIn,
} from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.css";
import RefreshTokenInterceptor from "./components/RefreshTokenInterceptor/RefreshTokenInterceptor";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const MainTransactionsPage = lazy(() =>
  import("./pages/MainTransactionsPage/MainTransactionsPage")
);
const TransactionsHistoryPage = lazy(() =>
  import("./pages/TransactionsHistoryPage/TransactionsHistoryPage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const refreshToken = useSelector(selectRefreshToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const storedRefreshToken =
      localStorage.getItem("refreshToken") || refreshToken;

    if (storedRefreshToken && !isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, refreshToken, isLoggedIn]);

  // Show Lader While there is a refresh or if there is a token but the user is not yet enrolling
  if (isRefreshing || (refreshToken && !isLoggedIn)) {
    return <Loader />;
  }

  //JSX
  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <RefreshTokenInterceptor />

      <RefreshTokenInterceptor />

      <Layout>
        <div className="pageWrapper">
          <Routes>
            <Route element={<SharedLayout />}>
              <Route index element={<WelcomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    redirectTo="/transactions"
                    component={<RegisterPage />}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    redirectTo="/transactions"
                    component={<LoginPage />}
                  />
                }
              />
            </Route>
            <Route
              path="/transactions"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<MainTransactionsPage />}
                />
              }
            />
            <Route
              path="/transactions/history/:transactionsType"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<TransactionsHistoryPage />}
                />
              }
            />
            <Route
              path="/transactions/history"
              element={<Navigate to="/transactions/history/expenses" />}
            />
            <Route path="*" element={<Navigate to="/transactions" />} />
          </Routes>
        </div>
      </Layout>
    </>
  );
}

export default App;
