import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { useId } from "react";
import toast from "react-hot-toast";
import { validationTransactionSchema } from "../../validation/validation";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../redux/transactions/operations";
import { clearCategory } from "../../redux/categories/slice";
import { FiCalendar } from "react-icons/fi";
import {
  clearTransactionRadioType,
  clearTransactionType,
  setTransactionRadioType,
} from "../../redux/transactions/slice";
import {
  selectCategoriesModalIsOpen,
  selectIsLoading,
} from "../../redux/transactions/selectors";
import SyncTransactionType from "../SyncTransactionType/SyncTransactionType";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "../CustomTimePicker/CustomTimePicker";
import CategoriesModal from "../CategoriesModal/CategoriesModal";
import CategoryField from "../CategoryField/CategoryField";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import { FaRegClock } from "react-icons/fa";
import { selectCurrency } from "../../redux/user/selectors";
import clsx from "clsx";
import css from "./TransactionForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const TransactionForm = () => {
  const isModalOpen = useSelector(selectCategoriesModalIsOpen);
  const isLoading = useSelector(selectIsLoading);
  const currencySelect = useSelector(selectCurrency);

  const dateId = useId();
  const timeId = useId();
  const categoryId = useId();
  const sumId = useId();
  const commentId = useId();

  const dispatch = useDispatch();

  const user = JSON.parse(
    JSON.parse(localStorage.getItem("persist:auth")).user
  );
  const currency = currencySelect ? currencySelect : user.currency;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addTransaction(values)).unwrap();
      toast.success("Transaction added");
      dispatch(clearCategory());
      dispatch(clearTransactionType());
      dispatch(clearTransactionRadioType());
      resetForm();
    } catch {
      toast.error("Something went wrong, please try different data.");
    }
  };

  // const today = new Date().toISOString().split("T")[0];
  // const currentTime = new Date().toISOString().split("T")[1].slice(0, 5);

  return (
    <div>
      {isLoading && <Loader />}
      <Formik
        initialValues={{
          type: "",
          date: "",
          time: "",
          category: "",
          sum: "",
          comment: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationTransactionSchema}
      >
        {({ values, setFieldValue }) => (
          <>
            <SyncTransactionType />
            <Form className={css.form}>
              <div className={css.transactionType}>
                <label className={css.customRadioLabel}>
                  <input
                    className={css.inputRadio}
                    type="radio"
                    name="type"
                    value="expenses"
                    checked={values.type === "expenses"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("type", value);
                      dispatch(setTransactionRadioType(value));
                    }}
                  />
                  <span className={css.radioIcon}>
                    {values.type === "expenses" ? (
                      <IoMdRadioButtonOn className={css.iconOn} />
                    ) : (
                      <IoMdRadioButtonOff className={css.iconOff} />
                    )}
                  </span>
                  Expense
                </label>

                <label className={css.customRadioLabel}>
                  <input
                    className={css.inputRadio}
                    type="radio"
                    name="type"
                    value="incomes"
                    checked={values.type === "incomes"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("type", value);
                      dispatch(setTransactionRadioType(value));
                    }}
                  />
                  <span className={css.radioIcon}>
                    {values.type === "incomes" ? (
                      <IoMdRadioButtonOn className={css.iconOn} />
                    ) : (
                      <IoMdRadioButtonOff className={css.iconOff} />
                    )}
                  </span>
                  Income
                </label>
                <ErrorMessage
                  className={css.error}
                  name="transactionType"
                  component="div"
                />
              </div>

              <div className={css.dateTime}>
                <div className={css.inputWrapper}>
                  <label className={css.label} htmlFor={dateId}>
                    Date
                  </label>

                  <Field name="date">
                    {({ field, form }) => (
                      <CustomDatePicker
                        className={clsx(css.input)}
                        field={field}
                        id={dateId}
                        form={form}
                        icon={<FiCalendar />}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    className={css.error}
                    name="date"
                    component="div"
                  />
                </div>

                <div className={css.inputWrapper}>
                  <label className={css.label} htmlFor={timeId}>
                    Time
                  </label>
                  <Field
                    className={css.input}
                    type="time"
                    name="time"
                    id={timeId}
                  />
                  <ErrorMessage
                    className={css.error}
                    name="time"
                    component="div"
                  />
                </div>
                {/* <div className={css.inputWrapper}>
                  <label className={css.label} htmlFor={timeId}>
                    Time
                  </label>

                  <Field name="date">
                    {({ field, form }) => (
                      <CustomTimePicker
                        id={timeId}
                        className={clsx(css.input)}
                        field={field}
                        form={form}
                        icon={<FaRegClock className="clock_icon" />}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    className={css.error}
                    name="time"
                    component="div"
                  />
                </div> */}
              </div>

              <CategoryField setFieldValue={setFieldValue} id={categoryId} />

              <div className={css.inputWrapper}>
                <label className={css.label} htmlFor={sumId}>
                  Sum
                </label>
                <Field
                  className={`${css.input} ${css.sumInput}`}
                  type="number"
                  name="sum"
                  placeholder="Entert the sum"
                  id={sumId}
                />
                <p className={css.currency}>{currency.toUpperCase()}</p>
                <ErrorMessage
                  className={css.error}
                  name="sum"
                  component="div"
                />
              </div>

              <div className={css.inputWrapper}>
                <label className={css.label} htmlFor={commentId}>
                  Comment
                </label>
                <Field
                  className={`${css.input} ${css.textarea}`}
                  as="textarea"
                  cols="20"
                  rows="5"
                  name="comment"
                  placeholder="Enter the text"
                  id={commentId}
                />
                <ErrorMessage
                  className={css.error}
                  name="comment"
                  component="div"
                />
              </div>

              <Button type="submit" size="small" variant="confirm">
                Add
              </Button>
            </Form>
          </>
        )}
      </Formik>
      {isModalOpen && <CategoriesModal />}
    </div>
  );
};

export default TransactionForm;
