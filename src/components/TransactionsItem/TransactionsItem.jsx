import React from 'react';
import { useDispatch } from 'react-redux';
import s from './TransactionsItem.module.css';
import { LuPen } from 'react-icons/lu';
import { FaRegTrashAlt } from 'react-icons/fa';

const TransactionsItem = ({ id, sum, date, time, comment, categoryName }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));
  const handleChange = () => dispatch();

  return (
    <div className={s.container} key={id}>
      <div className={s.wrapper}>
        <p className={s.categoryName}>{categoryName}</p>
        <p className={s.comment}>{comment}</p>
        <p className={s.date}>{date}</p>
        <p className={s.time}>{time}</p>
        <p className={s.sum}>{sum}</p>
        <div className={s.btn}>
          <button className={s.edit} type="button" onClick={handleChange}>
            <LuPen />
            Edit
          </button>
          <button className={s.delete} type="button" onClick={handleDelete}>
            <FaRegTrashAlt />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsItem;
