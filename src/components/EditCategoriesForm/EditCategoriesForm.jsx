import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { validationCategorySchema } from "../../validation/validation";
import { selectEditCategory } from "../../redux/categories/selectors";
import { editCategory } from "../../redux/categories/operations";
import css from "./EditCategoriesForm.module.css";
import { cancelEditCategory } from "../../redux/categories/slice";

const EditCategoriesForm = () => {
  const dispatch = useDispatch();
  const categoryToEdit = useSelector(selectEditCategory);
  const textId = useId();

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      id: categoryToEdit.id,
      categoryName:
        values.text.trim().charAt(0).toUpperCase() +
        values.text.trim().slice(1),
      type: categoryToEdit.type,
    };
    try {
      await dispatch(editCategory(payload)).unwrap();
      toast.success(`Category "${categoryToEdit.name}" sucsesfully edited`);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ text: categoryToEdit.name || "" }}
        onSubmit={handleSubmit}
        validationSchema={validationCategorySchema}
      >
        <Form>
          <div className={css.formWrapper}>
            <div className={css.inputWrapper}>
              <label className={css.label} htmlFor={textId}>
                Edit Category
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

            <Button
              className={css.button}
              type="submit"
              size="small"
              variant="confirm"
            >
              Confirm
            </Button>
            <Button
              className={css.cancelButton}
              type="bytton"
              size="small"
              variant="cancel"
              handleClick={() => dispatch(cancelEditCategory())}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCategoriesForm;
