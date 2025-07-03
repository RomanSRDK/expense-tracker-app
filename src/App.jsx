import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const MainTransactionsPage = lazy(() =>
  import("./pages/MainTransactionsPage/MainTransactionsPage")
);
const TransactionsHistoryPage = lazy(() =>
  import("./pages/TransactionsHistoryPage/TransactionsHistoryPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  //JSX
  return (
    !isRefreshing && (
      <>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/transactions/:transactionsType"
              element={<MainTransactionsPage />}
            />
            <Route
              path="/transactions/history/:transactionsType"
              element={<TransactionsHistoryPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </>
    )
  );
}

export default App;
