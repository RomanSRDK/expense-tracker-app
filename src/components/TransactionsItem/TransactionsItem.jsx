import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './TransactionsItem.module.css';
import { LuPen } from 'react-icons/lu';
import { FaRegTrashAlt } from 'react-icons/fa';
import TransactionForm from '../TransactionForm/TransactionForm';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../redux/user/selectors';
import { deleteTransaction } from '../../redux/transactions/operations';
import toast from 'react-hot-toast';

const TransactionsItem = ({ id, sum, date, time, comment, categoryName }) => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  const handleDelete = () => {
    dispatch(deleteTransaction(id))
      .unwrap()
      .then(() => {
        toast.success('Transaction deleted successfully');
      })
      .catch(() => {
        toast.error(`Error: ${error}`);
      });
  };

  return (
    <div className={s.container} key={id}>
      <div className={s.wrapper}>
        <p className={s.categoryName}>{categoryName}</p>
        <p className={s.comment}>{comment}</p>
        <p className={s.date}>{date}</p>
        <p className={s.time}>{time}</p>
        <p className={s.sum}>
          {sum} / {currency}
        </p>
        <div className={s.btn}>
          <button className={s.edit} type="button">
            <LuPen />
            <p className={s.text}>Edit</p>
          </button>
          <button className={s.delete} type="button" onClick={handleDelete}>
            <FaRegTrashAlt />
            <p className={s.text}>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsItem;
