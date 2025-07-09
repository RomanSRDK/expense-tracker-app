import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-overrides.css";
const CustomDatePicker = ({
  className,
  field,
  form,
  selectedDate,
  onChange,
  ...rest
}) => {
  const isFormik = !!field && !!form;
  const selected = isFormik
    ? field.value
      ? new Date(`${field.value}T12:00:00`)
      : null
    : selectedDate;
  const handleChange = (date) => {
    if (isFormik) {
      form.setFieldValue(field.name, date.toISOString().split("T")[0]);
    } else {
      onChange?.(date);
    }
  };
  return (
    <DatePicker
      className={className}
      selected={selected}
      onChange={handleChange}
      dateFormat="MM/dd/yyyy"
      showIcon
      placeholderText="mm/dd/yyyy"
      {...rest}
    />
  );
};
export default CustomDatePicker;
