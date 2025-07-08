import { useDispatch } from "react-redux";
import { LuPen } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrency } from "../../redux/user/selectors";
import { deleteTransaction } from "../../redux/transactions/operations";
import toast from "react-hot-toast";
import {
  openTransactionsEditModal,
  setTransactionRadioType,
  setTransactionToEdit,
  setTransactionType,
} from "../../redux/transactions/slice";
import { selectIsOpenTransactionEdit } from "../../redux/transactions/selectors";
import EditTransactionsModal from "../EditTransactionsModal/EditTransactionsModal";
import s from "./TransactionsItem.module.css";
import { setCategory } from "../../redux/categories/slice";
import {
  FaHome,
  FaUtensils,
  FaPhoneAlt,
  FaCar,
  FaCartPlus,
  FaQuestionCircle,
} from "react-icons/fa";

const TransactionsItem = ({ id, sum, date, time, comment, category, type }) => {
  const dispatch = useDispatch();
  const currencySelect = useSelector(selectCurrency);
  const isEditingTransaction = useSelector(selectIsOpenTransactionEdit);

  const user = JSON.parse(
    JSON.parse(localStorage.getItem("persist:auth")).user
  );
  const currency = currencySelect ? currencySelect : user.currency;

  const transactionValues = {
    date: date,
    time: time,
    sum: sum,
    comment: comment,
    type: type,
    id: id,
  };

  const handleEditClick = () => {
    dispatch(setTransactionToEdit(transactionValues));
    dispatch(openTransactionsEditModal());
    dispatch(setTransactionType(type));
    dispatch(setTransactionRadioType(type));
    dispatch(
      setCategory({
        id: category._id,
        name: category.categoryName,
        type: type,
      })
    );
  };

  const handleDelete = () => {
    try {
      dispatch(deleteTransaction({ type, transactionId: id })).unwrap();
      toast.success("Transaction deleted successfully");
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Функція, щоб отримати день тижня з дати у вигляді рядка
  const getWeekday = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays[dateObj.getDay()];
  };

  const formattedDate = `${getWeekday(date)}, ${date}`;

  const categoryIcons = {
    Home: <FaHome />,
    Food: <FaUtensils />,
    Phone: <FaPhoneAlt />,
    Transport: <FaCar />,
    Car: <FaCar />,
    Shopping: <FaCartPlus />,
    Other: <FaQuestionCircle />,
  };

  const categoryName = category?.categoryName || "Other";
  const icon = categoryIcons[categoryName] || categoryIcons["Other"];

  return (
    <>
      <div className={s.container} key={id}>
        <div className={s.wrapper}>
          <p className={s.categoryName}>
            <span className={s.icon}>{icon}</span>
            <span className={s.categoryText} title={categoryName}>
              {category.categoryName}
            </span>
          </p>
          <p className={s.comment} title={comment}>
            {comment}
          </p>
          <p className={s.date}>{formattedDate}</p>
          <p className={s.time}>{time}</p>
          <p className={s.sum}>
            {sum} / {currency.toUpperCase()}
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
      {isEditingTransaction && <EditTransactionsModal />}
    </>
  );
};

export default TransactionsItem;
