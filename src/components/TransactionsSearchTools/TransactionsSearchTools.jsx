import { useId } from "react";
import { CiSearch } from "react-icons/ci";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { FiCalendar } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import s from "./TransactionsSearchTools.module.css";

const TransactionsSearchTools = ({
  searchQuery,
  setSearchQuery,
  selectedDate,
  setSelectedDate,
}) => {
  const dateId = useId();
  const searchId = useId();
  return (
    <div className={s.tools}>
      <div className={s.input_wrap}>
        <input
          id={searchId}
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
          id={dateId}
          className={s.datePicker}
          placeholderText="dd/mm/yyyy"
          selectedDate={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          icon={<FiCalendar className={s.calendar_icon} />}
        />
      </div>
    </div>
  );
};

export default TransactionsSearchTools;
