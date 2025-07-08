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
      ? new Date(field.value)
      : null
    : selectedDate;

  const handleChange = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    if (isFormik) {
      form.setFieldValue(field.name, dateString);
    } else {
      onChange?.(dateString);
    }
  };

  // const handleChange = (date) => {
  //   const custom = date.toISOString().split("T")[0];
  //   if (isFormik) {
  //     form.setFieldValue(field.name, custom);
  //   } else {
  //     onChange?.(date);
  //   }
  // };

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
