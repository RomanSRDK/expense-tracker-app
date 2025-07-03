import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

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
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route index element={<WelcomePage />} />


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
  );
}

export default App;
