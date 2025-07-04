import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { validationCategorySchema } from "../../validation/validation";
import { selctsetTransactionType } from "../../redux/transactions/selectors";
import { addCategory } from "../../redux/categories/operations";
import css from "./CategoriesForm.module.css";

const CategoriesForm = () => {
  const dispatch = useDispatch();
  const textId = useId();
  const selectedTransactionType = useSelector(selctsetTransactionType);

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      type: values.category,
      categoryName:
        values.text.trim().charAt(0).toUpperCase() +
        values.text.trim().slice(1),
    };
    try {
      await dispatch(addCategory(payload)).unwrap();
      toast.success(`Category "${payload.categoryName}" was added`);
      resetForm();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          text: "",
          category:
            selectedTransactionType === "all"
              ? "incomes"
              : selectedTransactionType,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationCategorySchema}
      >
        <Form>
          <div className={css.formWrapper}>
            <div className={css.inputWrapper}>
              <label className={css.label} htmlFor={textId}>
                New Category
              </label>
              <Field
                className={css.input}
                type="text"
                name="text"
                placeholder="Enter the text"
                id={textId}
              />
              <ErrorMessage className={css.error} name="text" component="div" />
            </div>

            <Field className={css.select} as="select" name="category">
              <option value="incomes">Incomes</option>
              <option value="expenses">Expenses</option>
            </Field>

            <Button
              className={css.button}
              type="submit"
              size="small"
              variant="confirm"
            >
              Add
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CategoriesForm;
