import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegClock } from "react-icons/fa";
import "./timepicker-overrides.css";

const CustomTimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={(date) => setSelectedDateTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="HH:mm:ss"
      showTimeCaption={false}
      showIcon
      icon={<FaRegClock className="clock_icon" />}
    />
  );
};

export default CustomTimePicker;
