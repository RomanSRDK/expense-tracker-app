import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "./TransactionsList.module.css";

import {
  selectIsLoading,
  selectError,
  selectQueryTransactions,
} from "../../redux/transactions/selectors";

import { getQueryTransactions } from "../../redux/transactions/operations";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const TransactionsList = ({ searchQuery, selectedDate }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Функція щоб дістати тип з URL
  const getTransactionTypeFromURL = () => {
    const path = location.pathname.split("/").filter(Boolean);
    const last = path[path.length - 1];
    return last === "incomes" || last === "expenses" ? last : "all";
  };

  const transactionType = getTransactionTypeFromURL();

  // Отримуємо транзакції з Redux
  const transactions = useSelector(selectQueryTransactions);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Отправка запиту при монтуванні
  // useEffect(() => {
  //   if (transactionType !== 'all') {
  //     dispatch(getQueryTransactions(transactionType));
  //   }
  // }, [dispatch, transactionType, location]);

  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Місяці від 0 до 11
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (transactionType !== "all") {
      let queryParam = transactionType;
      if (selectedDate) {
        const formattedDate = formatDateLocal(selectedDate);
        queryParam = `${transactionType}?date=${formattedDate}`;
        // console.log(queryParam);
      }
      dispatch(getQueryTransactions(queryParam))
        .unwrap()
        .then((data) => {
          if (Array.isArray(data) && data.length === 0) {
            toast.error("There are no transactions for the selected date.");
            dispatch(getQueryTransactions(transactionType));
          }
        })
        .catch(() => {
          toast.error("Error loading transactions");
        });
    }
  }, [dispatch, transactionType, selectedDate, location]);

  // console.log(searchQuery);
  // console.log(selectedDate);

  const filteredTransactions = searchQuery.trim()
    ? transactions.filter((query) =>
        query.comment.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transactions;

  return (
    <div className={s.wrapper}>
      <div className={s.titles}>
        <p>Category</p>
        <p>Comment</p>
        <p>Date</p>
        <p>Time</p>
        <p>Sum</p>
        <p>Actions</p>
      </div>

      {isLoading && <Loader />}
      {error && <p className={s.error}>Error: {error}</p>}

      <div className={s.items}>
        {filteredTransactions.map(
          ({ _id, sum, date, time, comment, category: { categoryName } }) => (
            <TransactionsItem
              key={_id}
              id={_id}
              sum={sum}
              date={date}
              time={time}
              comment={comment}
              categoryName={categoryName}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
