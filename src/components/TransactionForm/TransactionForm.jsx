import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { useId } from "react";
import toast from "react-hot-toast";
import { validationTransactionSchema } from "../../validation/validation";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../redux/transactions/operations";
import {
  selectIsLoading,
  selectModalIsOpen,
} from "../../redux/transactions/selectors";
import SyncSelectedCategoryType from "../SyncSelectedCategoryType/SyncSelectedCategoryType";
import SyncTransactionType from "../SyncTransactionType/SyncTransactionType";
import CategoriesModal from "../CategoriesModal/CategoriesModal";
import CategoryField from "../CategoryField/CategoryField";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import css from "./TransactionForm.module.css";
import { clearCategory } from "../../redux/categories/slice";
import { clearTransactionType } from "../../redux/transactions/slice";

const TransactionForm = () => {
  const isModalOpen = useSelector(selectModalIsOpen);
  const isLoading = useSelector(selectIsLoading);

  const dateId = useId();
  const timeId = useId();
  const categoryId = useId();
  const sumId = useId();
  const commentId = useId();

  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addTransaction(values)).unwrap();
      toast.success("Transaction added");
      dispatch(clearCategory());
      dispatch(clearTransactionType());
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try different data.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toISOString().split("T")[1].slice(0, 5);

  return (
    <div>
      {isLoading && <Loader />}
      <Formik
        initialValues={{
          type: "",
          date: today,
          time: currentTime,
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
            <SyncSelectedCategoryType />
            <Form className={css.form}>
              <div className={css.transactionType}>
                <label className={css.customRadioLabel}>
                  <Field
                    className={css.inputRadio}
                    type="radio"
                    name="type"
                    value="expenses"
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
                  <Field
                    className={css.inputRadio}
                    type="radio"
                    name="type"
                    value="incomes"
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
                  <Field
                    className={css.input}
                    type="date"
                    name="date"
                    id={dateId}
                  />
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
              </div>
              <CategoryField setFieldValue={setFieldValue} id={categoryId} />

              <div className={css.inputWrapper}>
                <label className={css.label} htmlFor={sumId}>
                  Sum
                </label>
                <Field
                  className={css.input}
                  type="number"
                  name="sum"
                  placeholder="Entert the sum"
                  id={sumId}
                />
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
