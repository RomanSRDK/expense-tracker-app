import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllTransactions } from "../../redux/transactions/operations";
import { selectAllTransactions } from "../../redux/transactions/selectors";
import { CiSearch } from "react-icons/ci";
import s from "./TransactionsSearchTools.module.css";

import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { FiCalendar } from "react-icons/fi";

const TransactionsSearchTools = ({
  searchQuery,
  setSearchQuery,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className={s.tools}>
      <div className={s.input_wrap}>
        <input
          className={s.searchInput}
          type="text"
          placeholder="Search for anything.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiSearch className={s.search_icon} />
      </div>

      <div className={s.date_wrap}>
        <CustomDatePicker
          className={s.datePicker}
          placeholderText="dd/mm/yyyy"
          dateFormat="dd/MM/yyyy"
          selectedDate={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          icon={<FiCalendar className={s.calendar_icon} />}
        />
      </div>
    </div>
  );
};

export default TransactionsSearchTools;
