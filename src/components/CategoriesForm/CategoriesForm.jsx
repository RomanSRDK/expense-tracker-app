import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { validationCategorySchema } from "../../validation/validation";
import { selectTransactionType } from "../../redux/transactions/selectors";
import { addCategory } from "../../redux/categories/operations";
import css from "./CategoriesForm.module.css";
import CategoriesCustomSelect from "../CategoriesCustomSelect/CategoriesCustomSelect";
import { selectCategoriesList } from "../../redux/categories/selectors";

const CategoriesForm = ({ isDisabled }) => {
  const dispatch = useDispatch();
  const textId = useId();
  const selectedTransactionType = useSelector(selectTransactionType);
  const categoriesList = useSelector(selectCategoriesList);

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      type: values.category,
      categoryName:
        values.text.trim().charAt(0).toUpperCase() +
        values.text.trim().slice(1),
    };

    const categoryExists = categoriesList[payload.type]?.some(
      (category) =>
        category.categoryName.toLowerCase() ===
        payload.categoryName.toLowerCase()
    );

    if (categoryExists) {
      toast.error(`Category "${payload.categoryName}" already exists`);
      return;
    }

    try {
      await dispatch(addCategory(payload)).unwrap();
      toast.success(`Category "${payload.categoryName}" was added`);
      resetForm();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const typeNames = {
    expenses: "Expenses",
    incomes: "Incomes",
  };

  const initialCategory =
    selectedTransactionType === "all" ? "expenses" : selectedTransactionType;

  return (
    <div>
      <Formik
        initialValues={{
          text: "",
          category: initialCategory,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationCategorySchema}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className={css.formWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.label} htmlFor={textId}>
                  New Category
                </label>
                <Field
                  className={css.categoryInput}
                  type="text"
                  name="text"
                  placeholder="Enter the text"
                  id={textId}
                />
                <ErrorMessage
                  className={css.error}
                  name="text"
                  component="div"
                />
              </div>
              {isDisabled ? (
                <p className={css.categpryToAdd}>
                  {typeNames[selectedTransactionType] ||
                    selectedTransactionType}
                </p>
              ) : (
                <>
                  {selectedTransactionType === "all" ? (
                    <CategoriesCustomSelect
                      value={values.category}
                      setFieldValue={setFieldValue}
                      name="category"
                    />
                  ) : (
                    <p className={css.categpryToAdd}>
                      {typeNames[selectedTransactionType] ||
                        selectedTransactionType}
                    </p>
                  )}
                </>
              )}

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
        )}
      </Formik>
    </div>
  );
};

export default CategoriesForm;
