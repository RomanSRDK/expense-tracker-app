import { useParams, Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const TransactionsHistoryChecker = ({ Component, ...props }) => {
  const { transactionsType } = useParams();

  if (transactionsType !== "expenses" && transactionsType !== "incomes") {
    return <Navigate to="/transactions/history/expenses" />;
  }

  return <Component {...props} />;
};

export default TransactionsHistoryChecker;
