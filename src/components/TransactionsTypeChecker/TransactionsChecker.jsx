import { useParams, Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const TransactionsChecker = ({ Component, ...props }) => {
  const { transactionsType } = useParams();

  if (transactionsType !== "expenses" && transactionsType !== "incomes") {
    return <Navigate to="/transactions/expenses" />;
  }

  return <Component {...props} />;
};

export default TransactionsChecker;
