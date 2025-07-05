import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TransactionsItem from '../TransactionsItem/TransactionsItem';
import s from './TransactionsList.module.css';

import {
  selectAllTransactions,
  selectIsLoading,
  selectError,
  selectQueryTransactions,
} from '../../redux/transactions/selectors';

import {
  getAllTransactions,
  getQueryTransactions,
} from '../../redux/transactions/operations';
import Loader from '../Loader/Loader';

const TransactionsList = () => {
  // const transactions = [
  //   {
  //     _id: '6529eff94ceb918e15a171f1d',
  //     type: 'incomes',
  //     date: '2022-12-28',
  //     time: '19:45',
  //     category: {
  //       _id: '6522bf1f9027bb7d55d6512b',
  //       categoryName: 'Salary',
  //     },
  //     sum: 700,
  //     comment: 'December salary',
  //   },
  //   {
  //     _id: '6529eff94ceb918e15a171f1w',
  //     type: 'incomes',
  //     date: '2022-12-28',
  //     time: '19:45',
  //     category: {
  //       _id: '6522bf1f9027bb7d55d6512b',
  //       categoryName: 'Salary',
  //     },
  //     sum: 700,
  //     comment: 'December salary',
  //   },
  //   {
  //     _id: '6529eff94ceb918e15a171f1',
  //     type: 'incomes',
  //     date: '2022-12-28',
  //     time: '19:45',
  //     category: {
  //       _id: '6522bf1f9027bb7d55d6512b',
  //       categoryName: 'Salary',
  //     },
  //     sum: 700,
  //     comment: 'December salaryмвіавммімаа',
  //   },
  //   {
  //     _id: '6529eff94ceb918e15a171f531',
  //     type: 'incomes',
  //     date: '2022-12-28',
  //     time: '19:45',
  //     category: {
  //       _id: '6522bf1f9027bb7d55d6512b',
  //       categoryName: 'Salary',
  //     },
  //     sum: 700,
  //     comment: 'December salaryмвіавммімаа',
  //   },
  //   {
  //     _id: '6529eff94ceb918e15a171f134d',
  //     type: 'incomes',
  //     date: '2022-12-28',
  //     time: '19:45',
  //     category: {
  //       _id: '6522bf1f9027bb7d55d6512bwd',
  //       categoryName: 'Salary',
  //     },
  //     sum: '700 / UAH',
  //     comment: 'December salaryмвіавммімаа',
  //   },
  // ];

  //////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  // Функція щоб дістати тип з URL
  const getTransactionTypeFromURL = () => {
    const path = window.location.pathname.split('/').filter(Boolean);
    const last = path[path.length - 1];
    return last === 'incomes' || last === 'expenses' ? last : 'all';
  };

  const transactionType = getTransactionTypeFromURL();

  // Отримуємо транзакції з Redux
  const transactions = useSelector(selectQueryTransactions);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Отправка запиту при монтуванні
  useEffect(() => {
    if (transactionType !== 'all') {
      dispatch(getQueryTransactions(transactionType));
    }
  }, [dispatch, transactionType]);

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
        {transactions.map(
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
