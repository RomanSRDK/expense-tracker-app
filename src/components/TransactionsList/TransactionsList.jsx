import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TransactionsItem from '../TransactionsItem/TransactionsItem';
import s from './TransactionsList.module.css';

import {
  selectAllTransactions,
  selectIsLoading,
  selectError,
} from '../../redux/transactions/selectors';

import { getAllTransactions } from '../../redux/transactions/operations';
import Loader from '../Loader/Loader';

const TransactionsList = () => {
  const transactions = [
    {
      _id: '6529eff94ceb918e15a171f1d',
      type: 'incomes',
      date: '2022-12-28',
      time: '19:45',
      category: {
        _id: '6522bf1f9027bb7d55d6512b',
        categoryName: 'Salary',
      },
      sum: 700,
      comment: 'December salary',
    },
    {
      _id: '6529eff94ceb918e15a171f1w',
      type: 'incomes',
      date: '2022-12-28',
      time: '19:45',
      category: {
        _id: '6522bf1f9027bb7d55d6512b',
        categoryName: 'Salary',
      },
      sum: 700,
      comment: 'December salary',
    },
    {
      _id: '6529eff94ceb918e15a171f1',
      type: 'incomes',
      date: '2022-12-28',
      time: '19:45',
      category: {
        _id: '6522bf1f9027bb7d55d6512b',
        categoryName: 'Salary',
      },
      sum: 700,
      comment: 'December salaryмвіавммімаа',
    },
  ];

  // const dispatch = useDispatch();
  // const transactions = useSelector(selectAllTransactions);
  // const isLoading = useSelector(selectIsLoading);
  // const error = useSelector(selectError);

  // const [filterType, setFilterType] = useState('incomes'); // incomes | expenses

  // useEffect(() => {
  //   if (filterType === 'all') {
  //     dispatch(getAllTransactions());
  //   } else {
  //     dispatch(getAllTransactions(filterType));
  //   }
  // }, [dispatch, filterType]);

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

      {/* {isLoading && <Loader />}
      {error && <p className={s.error}>Error: {error}</p>} */}

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
