import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

const CustomTimePicker = ({
  className,
  field,
  form,
  selectedTime,
  onChange,
  initialValue,
  ...rest
}) => {
  const isFormik = !!field && !!form;

  const parseTimeToDate = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const selectedTimeFromField = isFormik
    ? field.value
      ? parseTimeToDate(field.value)
      : null
    : selectedTime;

  const handleChange = (time) => {
    const timeString = `${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    if (isFormik) {
      form.setFieldValue(field.name, timeString);
    } else {
      onChange?.(timeString);
    }
  };

  useEffect(() => {
    if (initialValue && !selectedTimeFromField) {
      const date = parseTimeToDate(initialValue);
      onChange?.(date);
    }
  }, [initialValue, selectedTimeFromField, onChange]);

  return (
    <DatePicker
      className={className}
      selected={selectedTimeFromField}
      onChange={handleChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="HH:mm"
      showIcon
      placeholderText="Select time"
      {...rest}
    />
  );
};

export default CustomTimePicker;
