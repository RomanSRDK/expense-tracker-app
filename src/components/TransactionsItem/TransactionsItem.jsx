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

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

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

  // Функція, щоб отримати день тижня з дати у вигляді рядка
  const getWeekday = dateString => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[dateObj.getDay()];
  };

  const formattedDate = `${getWeekday(date)}, ${date}`;

  return (
    <>
      <div className={s.container} key={id}>
        <div className={s.wrapper}>
          <p className={s.categoryName}>{categoryName}</p>
          <p className={s.comment}>{comment}</p>
          <p className={s.date}>{formattedDate}</p>
          <p className={s.time}>{time}</p>
          <p className={s.sum}>
            {sum} / {currency}
          </p>
          <div className={s.btn}>
            <button className={s.edit} type="button" onClick={handleEditClick}>
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

      {isEditing && (
        <TransactionForm
          initialValues={
            {
              // id,
              // type,
              // sum,
              // date,
              // time,
              // comment,
              // category: categoryName,
            }
          }
          onClose={handleCloseModal}
          isEditMode={true}
        />
      )}
    </>
  );
};

export default TransactionsItem;
