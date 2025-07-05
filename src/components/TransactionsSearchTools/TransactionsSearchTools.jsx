import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./TransactionsSearchTools.module.css";
import { getAllTransactions } from "../../redux/transactions/operations";
import { selectAllTransactions } from "../../redux/transactions/selectors";
import { CiSearch } from "react-icons/ci";

import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { FiCalendar } from "react-icons/fi";

const TransactionsSearchTools = ({ type }) => {
  //   const dispatch = useDispatch();
  //   const allTransactions = useSelector(selectAllTransactions);

  //   const [searchQuery, setSearchQuery] = useState('');
  // const [selectedDate, setSelectedDate] = useState(null);
  //   const [filteredTransactions, setFilteredTransactions] = useState([]);

  //   // Fetch transactions when date or type changes
  //   useEffect(() => {
  //     if (selectedDate && type) {
  //       const formattedDate = selectedDate.toISOString().split('T')[0];
  //       dispatch(getAllTransactions(type)); // Ми припускаємо, що бекенд повертає всі транзакції цього типу, а не лише за датою

  //       // після фетчу, ми вручну відфільтруємо за датою
  //     } else if (type) {
  //       dispatch(getAllTransactions(type));
  //     } else {
  //       dispatch(getAllTransactions());
  //     }
  //   }, [dispatch, selectedDate, type]);

  //   // Filter transactions locally by comment and date
  //   useEffect(() => {
  //     const result = allTransactions.filter(tx => {
  //       const matchesComment = tx.comment
  //         .toLowerCase()
  //         .includes(searchQuery.toLowerCase());

  //       const matchesDate = selectedDate
  //         ? tx.date === selectedDate.toISOString().split('T')[0]
  //         : true;

  //       return matchesComment && matchesDate;
  //     });

  //     setFilteredTransactions(result);
  //   }, [allTransactions, searchQuery, selectedDate]);

  //   // Оновлення списку транзакцій
  //   // Для цього можна підключити Redux-екшен або прокинути `onFilter` пропс
  //   // Але для прикладу ми просто консольно виводимо:
  //   useEffect(() => {
  //     console.log('Filtered:', filteredTransactions);
  //     // або прокинь: props.onFilter(filteredTransactions)
  //   }, [filteredTransactions]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className={s.tools}>
      <div className={s.input_wrap}>
        <input
          className={s.searchInput}
          type="text"
          placeholder="Search for anything.."
          // value={searchQuery}
          // onChange={e => setSearchQuery(e.target.value)}
        />
        <CiSearch className={s.search_icon} />
      </div>

      <div className={s.date_wrap}>
        <CustomDatePicker
          className={s.datePicker}
          selectedDate={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          icon={<FiCalendar className={s.calendar_icon} />}
        />
      </div>
    </div>
  );
};

export default TransactionsSearchTools;
