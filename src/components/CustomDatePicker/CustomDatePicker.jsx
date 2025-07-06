import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';
import './datepicker-overrides.css';

const CustomDatePicker = ({
  className,
  field, //  Formik
  form, //  Formik
  selectedDate, // useState
  onChange, // useState
  ...rest // додаткові пропси
}) => {
  const isFormik = !!field && !!form;

  const selected = isFormik
    ? field.value
      ? new Date(field.value)
      : null
    : selectedDate;

  const handleChange = date => {
    if (isFormik) {
      form.setFieldValue(field.name, date);
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
      placeholderText="Select a date"
      {...rest}
    />
  );
};

export default CustomDatePicker;
