import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-overrides.css";

const CustomDatePicker = ({ className, field, form }) => {
  return (
    <DatePicker
      className={className}
      selected={new Date(field.value)}
      onChange={(date) => form.setFieldValue("date", date)}
      dateFormat="mm/dd/yyyy"
      showIcon
      icon={<FiCalendar />}
    />
  );
};

export default CustomDatePicker;
